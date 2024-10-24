<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import BaseHeading from '@/components/ui/BaseHeading.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const cartStore = useCartStore()

const form = ref(null)
const isSubmitted = ref(false)
const orderTemp = {
  products: cartStore.cartList,
  totalPrice: cartStore.cartTotalPrice,
}

console.log(orderTemp)

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  address: yup.string().required('Address is required'),
  postcode: yup.string().required('Postcode is required'),
  phone: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  cardNumber: yup.string().required('Card number is required'),
  cardName: yup.string().required('Name on card is required'),
  cardDate: yup.string().required('Expiration date is required'),
  cardCVC: yup.string().required('CVC is required'),
})

const formData = ref({
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  address: '',
  postcode: '',
  phone: '',
  email: '',
  cardNumber: '',
  cardName: '',
  cardDate: '',
  cardCVC: '',
})

const onSubmit = () => {
  isSubmitted.value = true
  cartStore.resetCart()
}
</script>

<template>
  <div class="px-4 py-2 2xl:container mx-auto">
    <BaseHeading class="mb-4">Checkout</BaseHeading>
    <Form
      ref="form"
      :validation-schema="schema"
      @submit="onSubmit"
      :initial-values="formData"
      class="flex flex-col lg:flex-row gap-8"
    >
      <div class="flex-1">
        <h3 class="text-lg font-semibold uppercase mb-2">Billing Details</h3>
        <div class="flex flex-col sm:flex-row sm:gap-4">
          <BaseInput
            class="flex-1"
            placeholder="First Name"
            name="firstName"
            type="text"
            :is-disabled="!cartStore.cartList.length"
          />
          <BaseInput
            class="flex-1"
            placeholder="Last Name"
            name="lastName"
            type="text"
            :is-disabled="!cartStore.cartList.length"
          />
        </div>
        <BaseInput
          placeholder="Country"
          name="country"
          type="text"
          :is-disabled="!cartStore.cartList.length"
        />
        <BaseInput
          placeholder="City"
          name="city"
          type="text"
          :is-disabled="!cartStore.cartList.length"
        />
        <BaseInput
          placeholder="Address"
          name="address"
          type="text"
          :is-disabled="!cartStore.cartList.length"
        />
        <BaseInput
          placeholder="Postcode / ZIP"
          name="postcode"
          type="text"
          :is-disabled="!cartStore.cartList.length"
        />
        <BaseInput
          placeholder="Phone"
          name="phone"
          type="text"
          :is-disabled="!cartStore.cartList.length"
        />
        <BaseInput
          placeholder="Email"
          name="email"
          type="text"
          :is-disabled="!cartStore.cartList.length"
        />

        <h3 class="text-lg font-semibold uppercase mb-2">Payment</h3>
        <BaseInput
          placeholder="Name on card"
          name="cardName"
          type="text"
          :is-disabled="!cartStore.cartList.length"
        />
        <div class="flex flex-col sm:flex-row sm:gap-4">
          <BaseInput
            class="flex-1"
            placeholder="Card Number"
            name="cardNumber"
            type="text"
            :is-disabled="!cartStore.cartList.length"
            mask="#### #### #### ####"
          />
          <BaseInput
            placeholder="MM/YY"
            name="cardDate"
            type="text"
            :is-disabled="!cartStore.cartList.length"
            mask="##/##"
          />
          <BaseInput
            placeholder="CVC"
            name="cardCVC"
            type="text"
            :is-disabled="!cartStore.cartList.length"
            mask="###"
          />
        </div>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold uppercase mb-2">Your Order</h3>
        <div class="p-4 rounded bg-gray-100">
          <div class="flex justify-between pb-2 border-b mb-2">
            <b>Product</b>
            <b>Total</b>
          </div>
          <ul class="mb-2">
            <li
              v-for="product in orderTemp.products"
              :key="product.id"
              class="flex justify-between gap-2 py-1"
            >
              <span>{{ product.title }} x{{ product.amount }}</span>
              <span>${{ (product.price * product.amount).toFixed(2) }}</span>
            </li>
          </ul>
          <div class="flex justify-between pb-2 border-b mb-2">
            <b>Shipping</b>
            <span>Free Shipping</span>
          </div>
          <div class="flex justify-between pb-2">
            <b>Total</b>
            <b>${{ orderTemp.totalPrice }}</b>
          </div>
          <BaseButton
            :class="{
              hidden: isSubmitted,
              'cursor-not-allowed': !cartStore.cartList.length,
            }"
            :disabled="!cartStore.cartList.length"
            >PLACE ORDER</BaseButton
          >
        </div>
      </div>
    </Form>
    <Teleport to="body">
      <BaseModal v-if="isSubmitted" class="text-center">
        <div class="flex items-center gap-2 mb-2 text-green-500">
          <i class="pi pi-verified"></i>We've received your order
        </div>
        <RouterLink to="/" class="underline">Continue shopping</RouterLink>
      </BaseModal>
    </Teleport>
  </div>
</template>
