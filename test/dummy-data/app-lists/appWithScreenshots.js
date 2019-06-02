module.exports = {
  title: 'SwipeIn',
  subtitle: 'An app that allows people to swipe into lab',
  description: 'longer version of the subtitle',
  creator: [
    'dce',
    'seas',
  ],
  supportEmail: 'ithelp@harvard.edu',
  requestInstallEmail: 'instructionaltechnology@dce.harvard.edu',
  requestUninstallEmail: 'instructionaltechnology@dce.harvard.edu',
  messageBeforeInstall: 'Remember that this app can only be used by instructors',
  messageAfterInstall: 'Now that the app is installed, please launch the app and follow instructions to get the permission to use',
  messageBeforeUninstall: 'Once you uninstall this app, attendace information will be deleted',
  tags: {
    cost: 'free',
    type: [
      'attendance',
      'grading',
    ],
  },
  screenshots: [
    {
      title: 'Event Chooser',
      filename: 'event_chooser.png',
    },
    {
      title: 'Manual Seating Dashboard',
      filename: 'man_dash',
    },
  ],
  guides: [
    {
      title: 'Getting Started',
      steps: [
        'Launch the app',
        'Fill in the form',
        'Click Go',
      ],
    },
    {
      title: 'Taking Attendance',
      steps: [
        'Launch the app',
        'Choose an event',
        'Plug in your swiper',
        'Swipe someone\'s ID',
      ],
    },
  ],
};
