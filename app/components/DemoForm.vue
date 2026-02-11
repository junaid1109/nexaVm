<template>

    <Form class="demo-form" name="contact" @submit="onSubmit" :validation-schema="schema" v-slot>

        <p>

            <label>{{ $t('first-name') }}*
                <Field type="text" name="first-name" required />
                <ErrorMessage name="first-name" />
            </label>
            <label>{{ $t('last-name') }}*
                <Field type="text" name="last-name" required />
                <ErrorMessage name="last-name" />
            </label>
        </p>

        <label>{{ $t('work-email') }}*
            <Field type="email" name="email" required />
            <ErrorMessage name="email" />
        </label>
        <label>{{ $t('work-phone-number') }}
            <Field type="text" name="phone-number" />
        </label>
        <label>{{ $t('company-name') }}*
            <Field type="text" name="company-name" required />
            <ErrorMessage name="company-name" />
        </label>
        <label>{{ $t('company-size') }}*
            <Field as="select" name="company-size" required>
                <option value="" disabled>{{ $t('company-size') }}</option>
                <option value="10">+10</option>
                <option value="50">+50</option>
                <option value="100">+100</option>
            </Field>
            <ErrorMessage name="company-size" />
        </label>
        <label>{{ $t('company-field') }}*
            <Field type="text" name="company-field" required />
            <ErrorMessage name="company-field" />
        </label>
        <label>{{ $t('product-of-interest') }}*
            <Field as="select" name="product-of-interest" required>
                <option value="" disabled>{{ $t('product-of-interest') }}</option>
                <option value="Virtualization">{{ $t('Virtualization') }}</option>
                <option value="Multicloud">{{ $t('Multicloud') }}</option>
                <option value="Software-Defined-Storage">{{ $t('Software-Defined-Storage') }}</option>
                <option value="VDI">{{ $t('VDI') }}</option>
            </Field>
            <ErrorMessage name="product-of-interest" />
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
    'first-name': string().required().label(t('first-name')),
    'last-name': string().required().label(t('last-name')),
    'email': string().required().email().label(t('work-email')),
    'phone-number': string().label(t('work-phone-number')),
    'company-name': string().required().label(t('company-name')),
    'company-size': string().required().label(t('company-size')),
    'company-field': string().required().label(t('company-field')),
    'product-of-interest': string().required().label(t('product-of-interest'))
});

interface DemoForm {
    'first-name': string
    'last-name': string
    'email': string
    'phone-number'?: string
    'company-name': string
    'company-size': string
    'company-field': string
    'product-of-interest': string
}


const onSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {

    message.value = ''
    loading.value = true
    const formValues = values as DemoForm

    try {
        await useFetch('/api/demo', {
            method: 'POST',
            body: formValues
        })
        message.value = ''
        resetForm()
        message.value = t('demo-requested')

    } catch (err) {
        message.value = t('something-went-wrong')
    } finally {
        loading.value = false
    }
   
}

</script>
<style lang="postcss">
.demo-form {
    background-color: var(--white);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: var(--black);
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