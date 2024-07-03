import axios, { AxiosResponse } from 'axios';
import { IIpResponse } from 'src/interfaces/IIpResponse';

const checkIp = async (
  ip: string,
): Promise<{ city: string; country: string }> => {
  const ipRegExp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

  if (!ipRegExp.test(ip)) {
    throw Error('invalid ip');
  }

  const { data }: AxiosResponse = await axios.get(
    `http://ip-api.com/json/${ip}`,
  );

  const { country, city }: IIpResponse = data;

  return { country, city };
};

export { checkIp };
