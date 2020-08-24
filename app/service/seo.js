// app/service/system.js
const Service = require('egg').Service;

class SeoService extends Service {
  async info() {
    const { apiUrl } = this.config.seo;

    const data = await this.ctx.curl(`${apiUrl}?pathname=${this.ctx.request.url.replace(/\?.*/g, '')}&${this.ctx.querystring}`, {
      headers: {
        'Domain-Name': this.ctx.request.hostname,
      },
      dataType: 'json',
    });

    const { res } = data;

    if (res && res.code === 1) {
      return res.data || {};
    }
    return {
      title: '这里是标题',
      keywords: '这里是关键字',
      description: '这里是描述',
    };
  }

}

module.exports = SeoService;