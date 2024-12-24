import { Notificare } from 'capacitor-notificare';

export async function registerDeviceWithUser(token: string): Promise<void> {
  await registerDevice(token, 'PUT');
}

export async function registerDeviceAsAnonymous(token: string): Promise<void> {
  await registerDevice(token, 'DELETE');
}

export async function getUserInboxResponse(token: string): Promise<string> {
  const fetchInboxUrl = process.env.REACT_APP_USER_INBOX_FETCH_INBOX_URL;

  if (!fetchInboxUrl) {
    throw new Error('Failed to get user inbox response. Missing register device url entry in .env file.');
  }

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const response = await fetch(fetchInboxUrl, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  });

  if (!isValidResponse(response.status)) {
    throw new Error(`Failed to get user inbox response. Invalid response code: ${response.status}`);
  }

  return await response.text();
}

async function registerDevice(token: string, method: 'PUT' | 'DELETE') {
  const device = await Notificare.device().getCurrentDevice();

  if (!device) {
    throw new Error('Failed to register device. Can not register device without Device ID');
  }

  const registerDeviceUrl = process.env.REACT_APP_USER_INBOX_REGISTER_DEVICE_URL;

  if (!registerDeviceUrl) {
    throw new Error('Failed to register device. Missing register device url entry in .env file.');
  }

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const response = await fetch(`${registerDeviceUrl}/${device.id}`, {
    method: method,
    headers: myHeaders,
    redirect: 'follow',
  });

  if (!isValidResponse(response.status)) {
    throw new Error(`Failed to register device. Invalid response code: ${response.status}`);
  }
}

function isValidResponse(code: number): boolean {
  return code >= 200 && code <= 299;
}
