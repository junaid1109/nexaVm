<template>

    <Form class="jb-form"  @submit="onSubmit" :validation-schema="schema"  v-slot>

        <label>{{ $t('work-email') }}*
            <Field type="email" name="email" required />
            <ErrorMessage name="email" />
        </label>
        <label>{{ $t('Partnership Area of Interest') }}*
            <Field as="select" name="partner-area" required>
                <option value="" disabled>{{ $t('Partnership Area of Interest') }}</option>
                <option value="Distributor">Distributor</option>
                <option value="Reseller">Reseller</option>
            </Field>
            <ErrorMessage name="partner-area" />
        </label>
       

        <p class="form-btn">
            <AppButton
                v-if="!loading"
                variant="accent"
                block
                as="Field"
                type="submit"
            >
                {{ $t('send') }}
            </AppButton>

            <AppButton
                v-else
                variant="accent"
                block
                as="Field"
                type="button"
            >
                {{ $t('submitting')  }}
            </AppButton>
        </p>


        <p v-if="message">
            {{ message }}
        </p>
    </Form>


</template>
<script lang="ts" setup>

import { object, string } from 'yup';
import { Form, Field, ErrorMessage, configure } from 'vee-validate';

// Default values
configure({
    validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});

const { t } = useI18n()
const message = ref('')
const loading = ref(false)

const schema = object({
    'email': string().required().email().label(t('work-email')),
    'partner-area': string().required().label(t('partner-area')),
});

interface PartnerForm {
  email: string
  'partner-area': string
}


const onSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    message.value = ''
    loading.value = true
    const formValues = values as PartnerForm

   try {
        await useFetch('/api/partner', {
            method: 'POST',
            body: formValues
        })

        resetForm()
        message.value = t('becomeapartner-requested')
    } catch (err) {
        message.value = t('something-went-wrong')
    } finally {
        loading.value = false
    }
}

</script>
<style lang="postcss">
    .jb-form {
        background-color: var(--white);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        color: #000000;
        padding: 48px;
        position: relative;
        width: 100%;


        p {
            display: flex;
            gap: 8px;

            &>* {
                flex: 1;
            }
        }



        label {
            display: flex;
            flex-direction: column;
            font-size: 11px;
            text-transform: uppercase;
            color: var(--gray);
            height: 64px;

            input,
            select {
                padding: 8px 8px;
                border-radius: 8px;
                border: 1px solid var(--gray);
                height: 64px;
                font-family: var(--font);
                font-size: var(--text-mini);
                color: var(--dark-gray-2);
                font-weight: 200;
                letter-spacing: 0.04rem;

            }

            *[role="alert"] {
                color: var(--accent-orange);
            }
        }

        .form-btn {
            /* bottom: var(--app-margin); */
            /* left: var(--app-margin);
            right: var(--app-margin); */
            margin-top: 24px;
        }

    }


    @media screen and (max-width: 1200px) {
        .demo-form {
            padding: var(--app-margin-mobile);

            .form-btn {
                position: relative;
                bottom: auto;
                left: auto;
                right: auto;
            }

        }
    }
</style>