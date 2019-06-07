const courseOperations = {
  get: (opts) => {
    const { courseId } = opts;
    return {
      id: courseId,
      name: 'Gabe\'s "Sandbox" - DCE',
      account_id: courseId / 2,
      uuid: '358n0ac9ssdfoanvow39r',
      created_at: '2018-07-18T21:09:20Z',
      course_code: 'FAKE-COURSE',
      default_view: 'syllabus',
      root_account_id: 1,
      enrollment_term_id: 80,
      storage_quota_mb: 2048,
      time_zone: 'America/New_York',
    };
  },
};

const accountOperations = {
  get: (opts) => {
    const { accountId } = opts;
    if (accountId >= 50 && accountId <= 99) {
      return {
        id: accountId,
        name: `Fake Account ${accountId}`,
        workflow_state: 'active',
        parent_account_id: 2,
        root_account_id: 1,
        uuid: '293vbqn790880j48b5-k29vcoi4au',
        default_storage_quota_mb: 2048,
        default_user_storage_quota_mb: 50,
        default_group_storage_quota_mb: 1000,
        default_time_zone: 'America/New_York',
        sis_account_id: null,
        integration_id: null,
      };
    }
    if (accountId >= 1 && accountId <= 49) {
      throw new Error({
        message: 'While attempting to get info on a specific account, we ran into an error: Unfortunately, we couldn\'t complete a task because the current user does not have the correct permissions. If you think this is an error, please try again.',
        name: 'CACCLError',
        code: 'CANV4',
        isCACCLError: true,
      });
    }
    if (accountId >= 100) {
      throw new Error({
        message: 'While attempting to get info on a specific account, we ran into an error: The endpoint https://canvas.harvard.edu/api/v1/accounts/<id of the account we just requested> does not exist: Canvas responded with a 404 message. Please check your endpoint path.',
        name: 'CACCLError',
        code: 'CAPI15',
        isCACCLError: true,
      });
    }
  },
};

class API {
  constructor() {
    this.course = courseOperations;
    this.account = accountOperations;
  }
}

module.exports = API;
