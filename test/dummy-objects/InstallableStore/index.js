const installData = require('./installData');

const storeMetadata = JSON.parse('{"title":"Harvard Appstore"}');
const catalogIdToCatalogMetadata = JSON.parse('{"dce":{"title":"DCE catalog","accounts":[123123],"tagsToShow":[{"tagName":"cost","color":"blue"},{"tagName":"type","color":"red"}],"defaultSupportEmail":"example@harvard.edu","apps":{"gradeup":{"title":"GradeUp","subtitle":"GradeUp is a great tool","creator":["dce"],"launchPrivacy":"public","icon":{"fullPath":"/Users/gabeabrams/code/inclass/store/dce/gradeup/icon.png","url":"/public/dce/gradeup/icon"},"supportEmail":"example@harvard.edu"},"notinstalled":{"title":"NotInstalled","description":"","subtitle":"NotInstalled is an awful tool","creator":["dce"],"launchPrivacy":"anonymous","icon":{"fullPath":"/Users/gabeabrams/code/inclass/store/dce/notinstalled/icon.png","url":"/public/dce/notinstalled/icon"},"supportEmail":"example@harvard.edu"},"swipein":{"title":"SwipeIn","subtitle":"SwipeIn is a great tool","creator":["dce"],"launchPrivacy":"anonymous","icon":{"fullPath":"/Users/gabeabrams/code/inclass/store/dce/swipein/icon.png","url":"/public/dce/swipein/icon"},"supportEmail":"example@harvard.edu"}}}}');
const accountIdToCatalogId = JSON.parse('{"123123":"dce"}');

/**
 * A fake Store class with the installable data
 * @return {Store} the fake store
 */
/* eslint-disable class-methods-use-this */
class Store {
  getStoreMetadata() {
    return storeMetadata;
  }

  async getCatalogAndPermissions(api, launchInfo) {
    if (!api) {
      throw new Error('API not included');
    }

    if (!launchInfo || !launchInfo.courseId) {
      throw new Error('Launch info not included or not defined properly');
    }

    return {
      isAdmin: false,
      catalogId: 'dce',
      catalog: catalogIdToCatalogMetadata.dce,
    };
  }

  getInstallData(catalogId, appId) {
    if (!installData[catalogId]) {
      // No install data for this catalog
      return null;
    }
    if (!installData[catalogId][appId]) {
      // No install data for this app
      return null;
    }

    const {
      installXML,
      installationCredentials,
    } = installData[catalogId][appId];

    const appData = catalogIdToCatalogMetadata[catalogId].apps[appId];
    const { title, subtitle, launchPrivacy } = appData;
    const appInstallData = {
      description: subtitle,
      launchPrivacy,
      name: title,
      key: installationCredentials.consumer_key,
      secret: installationCredentials.consumer_secret,
      xml: installXML,
    };

    return appInstallData;
  }

  getCatalog(catalogId) {
    return catalogIdToCatalogMetadata[catalogId];
  }
}

module.exports = Store;
