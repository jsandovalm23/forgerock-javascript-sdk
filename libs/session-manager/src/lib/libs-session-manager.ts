/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import Config, { ConfigOptions } from '@forgerock/libs/config';
import { REQUESTED_WITH } from '@forgerock/libs/shared';
import { isOkOr4xx } from '@forgerock/libs/util-http';
import { ActionTypes } from '@forgerock/libs/shared-types';
import { withTimeout, middlewareWrapper, getEndpointPath, resolve } from '@forgerock/libs/util';

/**
 * Provides access to the session management API.
 */
abstract class SessionManager {
  /**
   * Ends the current session.
   */
  public static async logout(options?: ConfigOptions): Promise<Response> {
    const { middleware, realmPath, serverConfig } = Config.get(options);
    const init: RequestInit = {
      credentials: 'include',
      headers: new Headers({
        'accept-api-version': 'protocol=1.0,resource=2.0',
        'x-requested-with': REQUESTED_WITH,
      }),
      method: 'POST',
    };

    const path = `${getEndpointPath('sessions', realmPath, serverConfig.paths)}?_action=logout`;
    const url = resolve(serverConfig.baseUrl, path);

    const runMiddleware = middlewareWrapper(
      { url: new URL(url), init },
      { type: ActionTypes.Logout },
    );
    const req = runMiddleware(middleware);
    const response = await withTimeout(fetch(req.url.toString(), req.init), serverConfig.timeout);
    if (!isOkOr4xx(response)) {
      throw new Error(`Failed to log out; received ${response.status}`);
    }
    return response;
  }
}

export { SessionManager };