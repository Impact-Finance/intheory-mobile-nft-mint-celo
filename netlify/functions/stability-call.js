const axios = require('axios');
const randomDescriptor = require('../../utils/randDescriptor');

exports.handler = async function (event, context) {
  try {
    const { topics } = event.queryStringParameters;
    const prompt = `${randomDescriptor('subject')} ${randomDescriptor(
      'ingVerb'
    )} ${topics} in ${randomDescriptor('setting')} ${randomDescriptor(
      'adjective'
    )} ${randomDescriptor('color')} ${randomDescriptor('style')}`;
    // console.log(prompt);

    const BASE_URL = 'https://api.replicate.com/v1/predictions';
    const headers = {
      headers: {
        Authorization: `Token ${process.env.REPLICATION_STABILITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };
    const post_payload = {
      version:
        'a826166bdfbd1c12981a2e914120aa8c19ab2b5474ff8c70f4e2923e6d6596cc',
      input: { prompt: prompt, width: 768, height: 1024 },
    };

    const postResponse = await axios.post(BASE_URL, post_payload, headers);
    const getTarget = postResponse.data.urls.get;

    while (true == true) {
      let get_response = await axios
        .get(getTarget, headers)
        .catch(e => console.log(e.response));
      let state = get_response.data.status;
      if (state == 'processing' || 'starting') {
        //   console.log('generating');
        continue;
      } else if (state == 'failed' || state == 'canceled') {
        //   console.log('failed!');
        return {
          statusCode: 404,
          body: JSON.stringify({ imgURL: false }),
        };
      } else if (state == 'succeeded') {
        let final_url = get_response.data.output;
        return {
          statusCode: 200,
          body: JSON.stringify({ imgURL: final_url }),
        };
      }
    }
  } catch {
    return {
      statusCode: 404,
      body: JSON.stringify({ imgURL: false }),
    };
  }
};
