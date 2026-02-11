<template>

    <Form class="demo-form" name="contact" @submit="onSubmit" :validation-schema="schema" v-slot>

        <label>{{ $t('work-email') }}*
            <Field type="email" name="email" required />
            <ErrorMessage name="email" />
        </label>

        <label>{{ $t('first-name') }}*
            <Field type="text" name="first-name" required />
            <ErrorMessage name="first-name" />
        </label>

        <label>{{ $t('last-name') }}*
            <Field type="text" name="last-name" required />
            <ErrorMessage name="last-name" />
        </label>

        <label>{{ $t('work-phone-number') }}
            <Field type="text" name="phone-number" />
        </label>

        <label>{{ $t('company-name') }}*
            <Field type="text" name="company-name" required />
            <ErrorMessage name="company-name" />
        </label>

        <label>{{ $t('company-field') }}*
            <Field type="text" name="company-field" required />
            <ErrorMessage name="company-field" />
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
        
        <label>{{ $t('country') }}
            <Field type="text" name="country" required/>
            <ErrorMessage name="country" />
        </label>

        <label>{{ $t('Customer-type') }}*
            <Field as="select" name="customer-type" required>
                <option value="" disabled>{{ $t('Customer-type') }}</option>
                <option value="End User">End User</option>
                <option value="Partner">Partner</option>
                <option value="Distributor">Distributor</option>
            </Field>
            <ErrorMessage name="customer-type" />
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
    'first-name': string().required().label(t('first-name')),
    'last-name': string().required().label(t('last-name')),
    'phone-number': string().label(t('work-phone-number')),
    'company-name': string().required().label(t('company-name')),
    'company-size': string().required().label(t('company-size')),
    'company-field': string().required().label(t('company-field')),
    'country': string().required().label(t('country')),
    'customer-type': string().required().label(t('customer-type')),
});

interface TryForm {
    'email': string
    'first-name': string
    'last-name': string
    'phone-number'?: string
    'company-name': string
    'company-size': string
    'company-field': string
    'country': string
    'customer-type': string
}

const onSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    
    message.value = ''
    loading.value = true
    const formValues = values as TryForm

    try {
        await useFetch('/api/tryitnow', {
            method: 'POST',
            body: formValues
        })

        resetForm()
        message.value = t('tryitnow-requested')
        // window.location.href = 'https://hive.nexavm.com/category/6/download'

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