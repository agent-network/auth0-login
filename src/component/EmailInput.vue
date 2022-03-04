<template>
  <input
    type="email"
    class="form-control"
    :class="{ 'is-invalid': isInvalid }"
    placeholder="メールアドレスを入力"
    :value="value"
    @change="onChange"
  />
</template>

<script>
import { fullWidthTohalfWidth } from '../lib/input';

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(e) {
      const value = fullWidthTohalfWidth(e.target.value);
      this.$emit('input', value);
    },
  },
};
</script>
