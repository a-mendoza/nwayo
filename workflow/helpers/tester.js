//-------------------------------------
//-- Tester
//-------------------------------------
'use strict';

const bower          = require('bower');
const chalk          = require('chalk');
const findUp         = require('find-up');
const lastestVersion = require('latest-version');
const semver         = require('semver');
const fss            = require('@absolunet/fss');
const terminal       = require('@absolunet/terminal');
const env            = require('./env');
const paths          = require('./paths');
const toolbox        = require('./toolbox');


//-- Parse a linefeed-separated config
const parseConf = (filename) => {
	return fss.readFile(filename, 'utf8').split(`\n`).filter(Boolean);
};



//-- Tests
class Test {

	// Path exists and is git tracked
	exists(pathname) {
		const exists = [{
			type:    'exists',
			success: fss.exists(`${paths.dir.root}/${pathname}`),
			message: `${chalk.underline(pathname)}: Must exist`
		}];

		return exists.concat([{
			type:    'gitTracked',
			success: exists[0].success && Boolean(terminal.runAndGet(`cd ${paths.dir.root}; git ls-files ${pathname}`)),
			message: `${chalk.underline(pathname)}: Must be tracked by git`
		}]);
	}

	// Does file exists and is identical to matrix
	isMatrix(filename) {
		const existsReport = this.exists(filename);

		return existsReport.concat([{
			type:    'isMatrix',
			success: existsReport[0].success && fss.readFile(`${paths.dir.root}/${filename}`, 'utf8') === fss.readFile(`${paths.workflow.matrix}/${filename}`, 'utf8'),
			message: `${chalk.underline(filename)}: Must be identical to matrix`
		}]);
	}

	// Does file exists and contains matrix
	hasMatrix(filename) {
		let success = false;
		const missing = [];
		const existsReport = this.exists(filename);

		if (existsReport[0].success) {
			const entries = parseConf(`${paths.dir.root}/${filename}`);

			parseConf(`${paths.workflow.matrix}/${filename}`).forEach((entry) => {
				if (!entries.includes(entry)) {
					missing.push(entry);
				}
			});

			success = missing.length === 0;
		}

		return existsReport.concat([{
			type:    'hasMatrix',
			success: success,
			message: `${chalk.underline(filename)}: Must contain matrix${missing.length !== 0 ? ` (Missing: ${missing.join(' | ')})` : ''}`
		}]);
	}

}
const test = new Test();



//-- Reporter
class Reporter {

	constructor() {
		this.reports = [];
	}

	add(data) {
		if (Array.isArray(data)) {
			const results = {};

			data.forEach((item) => {
				this.reports.push({
					success: item.success,
					message: item.message
				});

				results[item.type] = item.success;
			});

			return results;
		}

		this.reports.push(data);

		return data.success;
	}

	get last() {
		return this.reports[this.reports.length - 1];
	}

	get list() {
		return this.reports;
	}

}






//-- Main

/*

lint files (json / yaml / editorconfig)

Remove PROJECT_NAME and verify bower/package have same name

Check bower.json

Check package.json

*/

class Tester {

	// Check if config files exists and are valid
	config(cb) {
		const reports = new Reporter();
		let lastTest;

		reports.add(test.isMatrix('.editorconfig'));

		reports.add(test.isMatrix('.eslintignore'));

		lastTest = reports.add(test.exists('.eslintrc.yaml'));
		if (lastTest.exists) {
			const config = toolbox.readYAML(`${paths.dir.root}/.eslintrc.yaml`);
			reports.add({
				success: config.extends && config.extends === '@absolunet/nwayo',
				message: `${chalk.underline('.eslintrc.yaml')}: Must extend '@absolunet/nwayo'`
			});
		}

		reports.add(test.hasMatrix('.gitattributes'));

		reports.add(test.hasMatrix('.gitignore'));

		reports.add(test.isMatrix('.stylelintignore'));

		lastTest = reports.add(test.exists('.stylelintrc.yaml'));
		if (lastTest.exists) {
			const config = toolbox.readYAML(`${paths.dir.root}/.stylelintrc.yaml`);
			reports.add({
				success: config.extends && config.extends === '@absolunet/stylelint-config-nwayo',
				message: `${chalk.underline('.stylelintrc.yaml')}: Must extend '@absolunet/stylelint-config-nwayo'`
			});
		}

		reports.add(test.exists('bower.json'));
		reports.add(test.exists('konstan.yaml'));
		reports.add(test.exists('lodash.yaml'));

		const nwayoConf = findUp.sync('nwayo.yaml', { cwd:paths.dir.root });
		reports.add({
			success: nwayoConf,
			message: `${chalk.underline('nwayo.yaml')}: Must exist in parent directories${nwayoConf ? ` (Found: ${nwayoConf})` : ''}`
		});

		reports.add(test.exists('modernizr.yaml'));
		reports.add(test.exists('package.json'));
		reports.add(test.exists('package-lock.json'));

		cb(null, { report:reports.list });
	}


	// Check if the workflow needs an update
	workflowUpdates(cb) {
		const current = env.workflowPkg.version;

		lastestVersion(env.pkgName).then((latest) => {
			if (semver.gt(latest, current)) {
				return cb(null, {
					outdated: [{
						current: current,
						latest:  latest,
						name:    env.pkgName
					}]
				});
			}

			return cb(null, { message:`Latest version is ${latest}` });
		});
	}


	// Check if bower packages need an update
	bowerUpdates(cb) {
		if (fss.exists(paths.config.bower)) {

			const isPreVersion = (v1, v2) => {
				return ['premajor', 'preminor', 'prepatch', 'prerelease'].includes(semver.diff(v1, v2));
			};

			const data = {
				outdated: []
			};

			return bower.commands.list(null, { cwd:paths.dir.root }).on('end', (deps) => {

				for (const name in deps.dependencies) {
					if (Object.prototype.hasOwnProperty.call(deps.dependencies, name)) {

						const info = deps.dependencies[name];

						let stable = false;

						if (info.pkgMeta) {

							// If there is an update
							if (info.update && info.pkgMeta.version !== info.update.latest) {

								// If the update is pre-version
								if (isPreVersion(info.update.latest, info.pkgMeta.version)) {

									// Search all versions
									for (const version of info.versions) {

										// If not a pre-version
										if (!isPreVersion(version, info.pkgMeta.version)) {

											// If newer than current version
											if (semver.gt(version, info.pkgMeta.version)) {
												stable = version;

											// Stop looping since in desc order
											} else {
												break;
											}
										}
									}

								// If update is a stable version
								} else {
									stable = info.update.latest;
								}

								// If a stable newer version was found
								if (stable) {
									data.outdated.push({
										name: name,
										current: info.pkgMeta.version,
										latest: stable
									});
								}
							}

						} else {
							data.outdated.push({
								name: name,
								message: 'Not installed'
							});
						}
					}
				}

				return cb(null, data);
			});

		}

		return cb(null, { error:'No bower.json file found' });
	}


	// Check if nwayo workflow and toolbox are at the same version
	syncWorkflowToolbox(cb) {
		if (fss.exists(paths.config.bower)) {
			const bowerConfig     = require(paths.config.bower);  // eslint-disable-line global-require
			const workflowVersion = env.workflowPkg.version;
			const toolboxVersion  = bowerConfig.devDependencies['nwayo-toolbox'];

			if (workflowVersion !== toolboxVersion) {
				return cb(null, { error:`Workflow ${workflowVersion} / Toolbox ${toolboxVersion} not in sync` });
			}

			return cb(null, { message:`Workflow / Toolbox are at ${workflowVersion}` });
		}

		return cb(null, { error:'No bower.json file found' });
	}

}


module.exports = new Tester();