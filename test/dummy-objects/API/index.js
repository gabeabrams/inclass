const appsInCourse = require('./appsInCourse');

/**
 * Returns a fake course where the account_id is the course_id / 2
 * @param {object} opts - an object containing the arguments
 * @param {number} opts.courseId - the id of the fake course
 * @return {Course} fake course
 */
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
  app: {
    list: async () => {
      return appsInCourse;
    },
    add: async (opts) => {
      const {
        courseId,
        name,
        key,
        secret,
        xml,
        description,
        launchPrivacy,
      } = opts;
      if (
        !courseId
        || !name
        || !key
        || !secret
        || !xml
        || !description
        || !launchPrivacy
      ) {
        throw new Error('One of the required params was not included');
      }

      return {
        name,
        id: 58914,
        domain: null,
        url: `https://${name}.com/launch`,
        consumer_key: key,
        description: null,
        created_at: '2019-06-19T19:03:25Z',
        updated_at: '2019-06-19T19:03:26Z',
        privacy_level: 'anonymous',
        custom_fields: {},
        workflow_state: 'anonymous',
        vendor_help_link: null,
        account_navigation: null,
        similarity_detection: null,
        assignment_edit: null,
        assignment_menu: null,
        assignment_selection: null,
        assignment_view: null,
        collaboration: null,
        course_assignments_menu: null,
        course_home_sub_navigation: null,
        course_navigation: {
          url: `https://${name}.com/launch`,
          text: name,
          visibility: 'public',
          default: 'enabled',
          enabled: 'true',
          label: name,
          selection_width: 800,
          selection_height: 400,
          icon_url: '',
        },
        course_settings_sub_navigation: null,
        discussion_topic_menu: null,
        editor_button: null,
        file_menu: null,
        global_navigation: null,
        homework_submission: null,
        link_selection: null,
        migration_selection: null,
        module_menu: null,
        post_grades: null,
        quiz_menu: null,
        resource_selection: null,
        tool_configuration: null,
        user_navigation: null,
        wiki_page_menu: null,
        icon_url: '',
        not_selectable: false,
        version: '1.1',
      };
    },
    remove: async (opts) => {
      const { courseId, appId } = opts;
      for (let i = 0; i < appsInCourse.length; i++) {
        if (appsInCourse[i].id === appId) {
          return appsInCourse[i];
        }
      }
      const err = new Error();
      err.message = `While attempting to remove an LTI app from a course, we ran into an error: The endpoint https://canvas.harvard.edu/api/v1/courses/${courseId}/external_tools/${appId} does not exist: Canvas responded with a 404 message. Please check your endpoint path.`;
      err.name = 'CACCLError';
      err.code = 'CAPI15';
      err.isCACCLError = true;
      throw err;
    },
  },
};

/**
 * Returns a fake account if the user is an admin. Our test user is an admin of
 *   accounts 50 through 99 (inclusive) and is not an admin for accounts 1
 *   through 49 (inclusive) and accounts 100 and higher do not exist
 * @param {object} opts - an object containing the arguments
 * @param {number} opts.accountId - the id of the fake acccount
 * @return {Account} fake account
 */
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
