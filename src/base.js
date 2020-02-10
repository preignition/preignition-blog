/*
   
   Base Class for Blog apps
  
   It adds some capabilities inheritted from Polymer

 */

import { LitElement, css } from 'lit-element';
// import { SelectMixin, DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import { DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import { LitNotify } from '@morbidick/lit-element-notify';

import { default as typography} from './styles/material/typography.js';
import { default as globalStyle} from './styles/material/global.js';


const deep = (action, obj, keys, id, key) => {
  keys = keys.split(".");
  id = keys.splice(-1, 1);
  for (key in keys) obj = obj[keys[key]] = obj[keys[key]] || {};
  return action(obj, id);
}

const get = (obj, prop) => obj[prop];
const set = n => (obj, prop) => (obj[prop] = n);

export class Base extends
LitNotify(
  DefaultValueMixin(
    // SelectMixin(
      DoNotSetUndefinedValue(
        LitElement))) {

  dispatch(name) {
    this.dispatchEvent(new CustomEvent(`${name}-changed`, {
      detail: {
        value: this[name]
      },
      bubbles: true,
      composed: true
    }));
  }

  get(path) {
    return deep(get, this, path);
  }

  set(path, value) {
    return deep(set(value), this, path);
  }

  static get styles() {
    return [
      globalStyle,
      typography
    ];
  }

  static get properties() {
    return {

      ...super.properties,

      /*
       * `log`  true to show log
       */
      log: {
        type: Boolean,
      },
    }
  }
}
