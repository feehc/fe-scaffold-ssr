const Service = require('egg').Service;

class SeoService extends Service {
  async info() {
    const { apiUrl } = this.config.seo;

    const { data: res } = await this.ctx.curl(`${apiUrl}?pathname=${this.ctx.request.url.replace(/\?.*/g, '')}&${this.ctx.querystring}`, {
      headers: {
        'Domain-Name': this.ctx.request.hostname,
      },
      dataType: 'json',
    });

    if (res && res.code === 1) {
      return res.data || {};
    }
    return {
      title: '',
      keywords: '',
      description: '',
    };
  }

}

module.exports = SeoService;