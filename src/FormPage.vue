<template>
  <form class="bg-white shadow-md rounded p-4 mb-4 w-1/2 mx-auto">
    <div class="property">
      <label class="text-style">User Id:</label>
      <input type="number" v-model="form.userId" placeholder="1234567"
             :class="['base-input', {'error-input': errors.userId}]">
      <p class="error-message" v-if="errors.userId">{{ errors.userId }}</p>
    </div>
    <div class="property">
      <label class="text-style">Device Serial Number:</label>
      <input type="text" v-model="form.deviceSerialNumber" placeholder="12-X34E5B678"
             :class="['base-input', {'error-input': errors.deviceSerialNumber}]">
      <p class="error-message" v-if="errors.deviceSerialNumber">{{ errors.deviceSerialNumber }}</p>
    </div>
    <div class="property">
      <label class="text-style">Describe the Problem:</label>
      <textarea class="base-input" type="text" v-model="form.problemDescription" rows="6" :maxlength="300"></textarea>
    </div>
    <div class="property">
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0" v-for="(_, i) in form.statusIndicatorLights" :key="i">
          <label class="text-style">Light {{ i + 1 }} </label>
          <div class="relative">
            <select v-model="form.statusIndicatorLights[i]" class="options">
              <option value="on">On</option>
              <option value="off">Off</option>
              <option value="blinking">Blinking</option>
            </select>
            <div class="pointer">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <button class="button" @click.prevent="onSubmit">Submit</button>
    </div>
    <div class="flex justify-center mt-6"><p class="response-style" v-if="response">{{ response }}</p></div>
  </form>
</template>
<script setup lang="ts">
import {computed, ref} from 'vue';
import {HandleResponse} from './ts/handle_response';
import type {FormData, ValidationErrors} from "./types";


const responseHandler = new HandleResponse();
const response = ref<string>('');

const form = ref<FormData>({
      statusIndicatorLights: ['on', 'on', 'on'],
      deviceSerialNumber: '',
      userId: null,
      problemDescription: ''
    }
)
const errors = ref<ValidationErrors>({
  deviceSerialNumber: '',
  userId: '',
})

// validation
const isDeviceSerialNumberValid = computed(() => form.value.deviceSerialNumber.length === 6);
const isUserIdValid = computed(() => form.value.userId !== null);

const validateForm = () => {
  errors.value.userId = isUserIdValid.value ? '' : 'Username is required';
  errors.value.deviceSerialNumber = isDeviceSerialNumberValid.value ? '' : 'Length should be 6';

  return Object.values(errors.value).every((error: string) => !error);
};
const onSubmit = () => {
  if (validateForm()) {
    response.value = responseHandler.calculateUserResponse(form.value);
  } else {
    response.value = ''
  }
}
</script>
