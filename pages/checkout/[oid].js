import Head from 'next/head'
import React from 'react'
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const orderId = () => {
    return (
        <>
            <Head>
                <title>shopEasee - checkout form</title>
                <meta
                    name="description"
                    content="It is a shopping app that provides best quality products at a affodable price at your door step."
                />
                <link rel="shortcut icon" href="/icon2.png" />
            </Head>
            <div className='w-[80%] mx-auto p-2 mt-3'>
                <h2 className="font-bold text-3xl tracking-wider my-3">
                    Check Out
                </h2>
                <div className='flex justify-between items-start space-x-5'>
                    <div className='flex-1 p-2'>
                        <h2 className='font-semibold text-2xl tracking-wider capitalize text-gray-500 my-2'>Billing details</h2>
                        <div className='flex justify-between items-center space-x-3'>
                            <div className='flex flex-col justify-start items-start space-y-2 flex-1'>
                                <label className='font-bold text-gray-600 text-md tracking-wider' htmlFor='firstName'>First Name <span className='text-red-500 text-xl font-bold'>*</span></label>
                                <input placeholder='First Name...' className='border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider capitalize tracking-wider' type='text' id='firstName' />
                            </div>
                            <div className='flex flex-col justify-start items-start space-y-2 flex-1'>
                                <label className='font-bold text-gray-600 text-md tracking-wider' htmlFor='lastName'>Last Name <span className='text-red-500 text-xl font-bold'>*</span> </label>
                                <input placeholder='Last Name...' className='border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider capitalize tracking-wider' type='text' id='lastName' />
                            </div>
                        </div>
                        <div className='flex flex-col justify-start items-start space-y-2 my-2'>
                            <label className='font-bold text-gray-600 text-md tracking-wider' htmlFor='email'>Email <span className='text-red-500 text-xl font-bold'>*</span></label>
                            <input placeholder='Enter Your Email...' className='border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider capitalize tracking-wider' type='text' id='email' />
                        </div>
                        <div className='flex flex-col justify-start items-start space-y-2 my-2'>
                            <label className='font-bold text-gray-600 text-md tracking-wider' htmlFor='phoneNumber'>Phone Number <span className='text-red-500 text-xl font-bold'>*</span></label>
                            <input placeholder='Enter Phone Number...' className='border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider capitalize tracking-wider' type='text' id='phoneNumber' />
                        </div>
                        <div className='flex flex-col justify-start items-start space-y-2 my-2'>
                            <label className='font-bold text-gray-600 text-md tracking-wider' htmlFor='alterNumber'>Alternate Number <span className='text-red-500 text-xl font-bold'>*</span></label>
                            <input placeholder='Enter Alternate Number...' className='border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider capitalize tracking-wider' type='text' id='alterNumber' />
                        </div>
                        <div className='flex flex-col justify-start items-start space-y-2 my-2'>
                            <label className='font-bold text-gray-600 text-md tracking-wider' htmlFor='country'>Country <span className='text-red-500 text-xl font-bold'>*</span></label>
                            <input placeholder='Enter Your Country...' className='border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider capitalize tracking-wider' type='text' id='country' />
                        </div>
                        <div className='flex flex-col justify-start items-start space-y-2 my-2'>
                            <label className='font-bold text-gray-600 text-md tracking-wider' htmlFor='streetAddress'>Street Adress <span className='text-red-500 text-xl font-bold'>*</span></label>
                            <input placeholder='Enter Street Address...' className='border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider capitalize tracking-wider' type='text' id='streetAddress' />
                        </div>
                        <div className='flex flex-col justify-start items-start space-y-2 my-2'>
                            <label className='font-bold text-gray-600 text-md tracking-wider' htmlFor='apartmentNumber'>Apartment Number</label>
                            <input placeholder='Apartment Number , Name...' className='border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider capitalize tracking-wider' type='text' id='apartmentNumber' />
                        </div>
                        <div className='flex flex-col justify-start items-start space-y-2 my-2'>
                            <label className='font-bold text-gray-600 text-md tracking-wider' htmlFor='city'>City <span className='text-red-500 text-xl font-bold'>*</span></label>
                            <input placeholder='Enter Your City...' className='border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider capitalize tracking-wider' type='text' id='city' />
                        </div>
                        <div className='flex flex-col justify-start items-start space-y-2 my-2'>
                            <label className='font-bold text-gray-600 text-md tracking-wider' htmlFor='state'>State <span className='text-red-500 text-xl font-bold'>*</span></label>
                            <input placeholder='Enter Your State...' className='border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider capitalize tracking-wider' type='text' id='state' />
                        </div>
                        <div className='flex flex-col justify-start items-start space-y-2 my-2'>
                            <label className='font-bold text-gray-600 text-md tracking-wider' htmlFor='pincode'>Pin-Code <span className='text-red-500 text-xl font-bold'>*</span></label>
                            <input placeholder='Enter Pin-Code...' className='border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider capitalize tracking-wider' type='text' id='pincode' />
                        </div>
                    </div>
                    <div className='flex-1  p-2'>
                        <h2 className='font-semibold text-2xl tracking-wider capitalize text-gray-500 my-2'>Payment details</h2>
                        {/* heading start */}
                        <div className='flex justify-between items-center'>
                            <div className='bg-gray-100 p-2 flex-1'>
                                <h3 className='text-2xl text-center font-bold tracking-wider'>Product</h3>
                            </div>
                            <div className='flex-1 bg-gray-200 p-2'>
                                <h3 className='text-2xl font-bold tracking-wider text-center'>Subtotal</h3>
                            </div>
                        </div>
                        {/* heading end */}

                        <div className='my-2'>
                            <div className='flex justify-between items-center'>

                                {/* loop here start */}
                                <div className='flex-1 p-2'>
                                    <h2 className='text-lg font-semibold tracking-wider'>Roadstret Round Neck Navy Blue with Yellow stripe. x 1</h2>
                                </div>
                                <div className='flex-1 p-2'>
                                    <h2 className='text-2xl font-semibold tracking-wider text-center'><CurrencyRupeeIcon className='text-base' />356.00</h2>
                                </div>
                            </div>

                            <div className='flex justify-between items-center'>
                                <div className='flex-1 p-2'>
                                    <h2 className='text-lg font-semibold tracking-wider'>Roadstret Round Neck Navy Blue with Yellow stripe. x 1</h2>
                                </div>
                                <div className='flex-1 p-2'>
                                    <h2 className='text-2xl font-semibold tracking-wider text-center'><CurrencyRupeeIcon className='text-base' />356.00</h2>
                                </div>
                            </div>

                            {/* ^^^^^loop here end */}

                            <div className='flex justify-between items-center'>
                                <div className='flex-1 p-2 bg-gray-100'>
                                    <h2 className='text-lg font-semibold tracking-wider'>Subtotal</h2>
                                </div>
                                <div className='flex-1 p-2'>
                                    <h2 className='text-2xl font-semibold tracking-wider text-center'><CurrencyRupeeIcon className='text-base' />712.00</h2>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex-1 p-2 bg-gray-200'>
                                    <h2 className='text-lg font-semibold tracking-wider'>Total</h2>
                                </div>
                                <div className='flex-1 p-2'>
                                    <h2 className='text-2xl font-semibold tracking-wider text-center'><CurrencyRupeeIcon className='text-base' />712.00</h2>
                                </div>
                            </div>

                        </div>

                        <div className='p-2'>
                            <h3 className='text-2xl font-semibold tracking-wider'>Coupon Code</h3>
                            <div className='flex justify-center items-center w-[80%] mx-auto mt-3 shadow-md space-x-1'>
                                <div className='flex-1'>
                                    <input type='text' className='w-full py-1 px-3 outline-gray-400 text-lg font-semibold tracking-wider rounded-s-md' placeholder='Enter Code...' />
                                </div>
                                <div className=''>
                                    <button className='font-extrabold text-md tracking-wider text-white px-3 py-2 rounded-e-md bg-green-400'>
                                        Apply Discount
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='my-2 p-2'>
                            <h2 className='text-2xl font-semibold tracking-wider'>Payment Method</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default orderId