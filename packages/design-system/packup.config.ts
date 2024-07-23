/* eslint-disable import/no-default-export */
import { defineConfig } from '@strapi/pack-up';

export default defineConfig({
  externals: ['@codemirror/state', '@codemirror/view'],
});
