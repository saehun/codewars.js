const { describe, it, Test } = require('../../utils/test-framework');

/// Write a function, which takes a non-negative integer (seconds) as input and returns
/// the time in a human-readable format (`HH:MM:SS`)
///
/// * `HH` = hours, padded to 2 digits, range: 00 - 99
/// * `MM` = minutes, padded to 2 digits, range: 00 - 59
/// * `SS` = seconds, padded to 2 digits, range: 00 - 59
///
/// The maximum time never exceeds 359999 (`99:59:59`)
///
/// You can find some examples in the test fixtures.

function humanReadable(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const remainder = totalSeconds % 3600;
  const minutes = Math.floor(remainder / 60);
  const seconds = remainder % 60;

  return [hours, minutes, seconds].map(num => String(num).padStart(2, '0')).join(':');
}

describe('examples', function () {
  it('should format correctly', function () {
    Test.assertEquals(humanReadable(0), '00:00:00', 'humanReadable(0)');
    Test.assertEquals(humanReadable(5), '00:00:05', 'humanReadable(5)');
    Test.assertEquals(humanReadable(60), '00:01:00', 'humanReadable(60)');
    Test.assertEquals(humanReadable(86399), '23:59:59', 'humanReadable(86399)');
    Test.assertEquals(humanReadable(359999), '99:59:59', 'humanReadable(359999)');
  });
});
