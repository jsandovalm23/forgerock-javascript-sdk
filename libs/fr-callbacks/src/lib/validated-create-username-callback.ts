/*
 * @forgerock/javascript-sdk
 *
 * validated-create-username-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FRCallback, Callback } from '@forgerock/libs/fr-callback';
import { PolicyRequirement } from '@forgerock/libs/step-types';
import { StringDict } from '@forgerock/libs/shared';

/**
 * Represents a callback used to collect a valid platform username.
 */
class ValidatedCreateUsernameCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the callback's prompt.
   */
  public getPrompt(): string {
    return this.getOutputByName<string>('prompt', '');
  }

  /**
   * Gets the callback's failed policies.
   */
  public getFailedPolicies(): PolicyRequirement[] {
    return this.getOutputByName<PolicyRequirement[]>('failedPolicies', []);
  }

  /**
   * Gets the callback's applicable policies.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getPolicies(): StringDict<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.getOutputByName<StringDict<any>>('policies', {});
  }

  /**
   * Gets whether the username is required.
   */
  public isRequired(): boolean {
    return this.getOutputByName<boolean>('required', false);
  }

  /**
   * Sets the callback's username.
   */
  public setName(name: string): void {
    this.setInputValue(name);
  }

  /**
   * Set if validating value only.
   */
  public setValidateOnly(value: boolean): void {
    this.setInputValue(value, /validateOnly/);
  }
}

export { ValidatedCreateUsernameCallback };