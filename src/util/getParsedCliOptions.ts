export const getParsedCliOptions = () => {
  const { program } = require('commander');

  program
    .option(
      '-i, --index-json',
      'Run in index json mode. Automatically detected (requires a compatible Storybook)'
    )
    .option(
      '-s, --stories-json',
      'Run in index json mode. Automatically detected (requires a compatible Storybook) [deprecated, use --index-json]'
    )
    .option('--no-index-json', 'Disable index json mode')
    .option('--no-stories-json', 'Disable index json mode [deprecated, use --no-index-json]')
    .option(
      '-c, --config-dir <directory>',
      'Directory where to load Storybook configurations from',
      '.storybook'
    )
    .option('--watch', 'Watch files for changes and rerun tests related to changed files', false)
    .option('--watchAll', 'Watch files for changes and rerun all tests when something changes')
    .option(
      '--browsers <browsers...>',
      'Define browsers to run tests in. Could be one or multiple of: chromium, firefox, webkit',
      ['chromium']
    )
    .option(
      '--url <url>',
      'Define the URL to run tests in. Useful for custom Storybook URLs',
      'http://localhost:6006'
    )
    .option(
      '--maxWorkers <amount>',
      'Specifies the maximum number of workers the worker-pool will spawn for running tests'
    )
    .option('--no-cache', 'Disable the cache')
    .option('--clearCache', 'Deletes the Jest cache directory and then exits without running tests')
    .option('--verbose', 'Display individual test results with the test suite hierarchy')
    .option(
      '-u, --updateSnapshot',
      'Use this flag to re-record every snapshot that fails during this test run'
    )
    .option(
      '--json',
      'Prints the test results in JSON. This mode will send all other test output and user messages to stderr.'
    )
    .option(
      '--outputFile',
      'Write test results to a file when the --json option is also specified.'
    )
    .option(
      '--coverage',
      'Indicates that test coverage information should be collected and reported in the output'
    )
    .option('--junit', 'Indicates that test information should be reported in a junit file')
    .option(
      '--eject',
      'Creates a local configuration file to override defaults of the test-runner. Use it only if you want to have better control over the runner configurations'
    )
    .option(
      '--ci',
      'Instead of the regular behavior of storing a new snapshot automatically, it will fail the test and require to be run with --updateSnapshot.'
    );

  program.exitOverride();

  try {
    program.parse();
  } catch (err) {
    switch (err.code) {
      case 'commander.unknownOption': {
        program.outputHelp();
        console.warn(
          `\nIf you'd like this option to be supported, please open an issue at https://github.com/storybookjs/test-runner/issues/new\n`
        );
        process.exit(1);
      }

      case 'commander.helpDisplayed': {
        process.exit(0);
      }

      default: {
        throw err;
      }
    }
  }

  const { storiesJson, ...options } = program.opts();
  return {
    options: {
      indexJson: storiesJson,
      ...options,
    },
    extraArgs: program.args,
  };
};
