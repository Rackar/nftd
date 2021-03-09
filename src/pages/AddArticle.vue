<template>
  <q-page class="column items-center justify-evenly">
    <h1 class="row myh1">发起</h1>
    <div class="row">
      <q-input outlined v-model="text" label="标题" />
    </div>
    <div class="row">
      <q-editor
        v-model="qeditor"
        :dense="$q.screen.lt.md"
        :definitions="{
          upload: {
            tip: 'Upload to cloud',
            icon: 'cloud_upload',
            label: 'Upload',
            handler: uploadIt,
          },
        }"
        :toolbar="[
          [
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              options: ['left', 'center', 'right', 'justify'],
            },
          ],
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'link', 'custom_btn'],
          ['upload', 'print', 'fullscreen'],
          [
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7',
              ],
            },
            {
              label: $q.lang.editor.defaultFont,
              icon: $q.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana',
              ],
            },
            'removeFormat',
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

          ['undo', 'redo'],
          ['viewsource'],
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana',
        }"
      />
    </div>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          type="number"
          v-model="address"
          label="NFT地址"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          filled
          type="number"
          v-model="totals"
          label="筹集资金总数"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="number"
          v-model="tokens"
          label="Token总数量"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type ',
            (val) => (val > 0 && val < 100) || 'Please type a number',
          ]"
        />
        <q-input
          filled
          type="number"
          v-model="price"
          label="Token单价"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type a number',
            (val) => (val > 0 && val < 100) || 'Please type a number',
          ]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AddArticle',
  setup() {
    const $q = useQuasar();
    const qeditor = ref('details');

    const totals = ref(null);
    const tokens = ref(null);
    const price = ref(null);
    const accept = ref(false);
    function onSubmit() {
      if (accept.value !== true) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first',
        });
      } else {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted',
        });
      }
    }

    function onReset() {
      totals.value = null;
      tokens.value = null;
      price.value = null;
      accept.value = false;
    }
    function uploadIt() {
      $q.notify({
        message: 'Server unavailable. Check connectivity.',
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
      });
    }

    return {
      qeditor,
      uploadIt,
      text: ref(''),
      totals,
      tokens,
      price,
      onReset,
      onSubmit,
      accept,
    };
  },
});
</script>
<style>
.myh1 {
  font-size: 2rem;
  font-weight: 300;
  line-height: 1rem;
  letter-spacing: -0.01562em;
}
</style>
