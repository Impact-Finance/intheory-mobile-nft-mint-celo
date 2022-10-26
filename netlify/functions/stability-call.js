const axios = require('axios');
const randomDescriptor = require('../../utils/randDescriptor');

// This function generates an image using the topics selected by calling the Stable Diffusion model through the Replicate API.
// The output is the remote url to the generated image.

exports.handler = async function callStability(event, context) {
  try {
    const { topics } = event.queryStringParameters;
    const prompt = `${topics}, ${randomDescriptor(
      'setting'
    )}, ${randomDescriptor('adjective')}, ${randomDescriptor(
      'color'
    )}, ${randomDescriptor('style')} style, no text`;
    console.log(prompt);

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
      input: { prompt: prompt, width: 512, height: 896 },
    };

    const postResponse = await axios.post(BASE_URL, post_payload, headers);
    const getTarget = postResponse.data.urls.get;

    while (true == true) {
      let get_response = await axios
        .get(getTarget, headers)
        .catch(e => console.log(e.response));
      let state = get_response.data.status;
      if (state == 'processing' || state == 'starting') {
        console.log('generating');
        await new Promise(res => setTimeout(res, 1000));
        continue;
      } else if (state == 'failed' || state == 'canceled') {
        console.log('failed!');
        return {
          statusCode: 404,
          body: JSON.stringify({ imgURL: false }),
        };
      } else if (state == 'succeeded') {
        console.log('success!');
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
