import React from 'react'
import axios from 'axios'
import {backend_ip} from '../../utils/utils'

import { Formik, Field, Form } from 'formik';

export function InputComponent(props) {

    const submitAttempt = async (values) => {
        axios.post(`http://${backend_ip}:3001/student/attempt`, {
            student_token: values.token, secret: values.secret
        }, {
            withCredentials: false
        }).then((response) => {
            if (response.status >= 200 && response.status <= 299) {  
                alert(`Status Code [${response.status}]\n${response.data.msg}\nResult: ${response.data.result}`)       
                return true            
            } else {
                alert(`Status Code [${response.status}] \n${response.data.error}`)
                return false
            }
        }).catch(err => {
            alert(`Status Code [${err.response.status}] \n${err.response.data.error}`)
            return false
        })
    }

    return (
        <div class="popup-position">
            <div class="popup-container">
                    
                <h2 class="text-center push-1-2 yotta">Submit Attempt</h2>

                <Formik
                    initialValues={{
                        token: '',
                        secret: '',
                    }}
                    onSubmit={async (values) => {
                        await submitAttempt(values)
                    }}
                >
                    <Form>            
                        <div class="attempt-data push-1-2">
                            <label for="token">Student Token</label>
                            <Field id="token" name="token" type="text" placeholder="Token" />
                        </div>
            
                        <div class="attempt-data push">
                            <label for="secret">Secret</label>
                            <Field id="secret" name="secret" placeholder="Secret" type="text"/>
                        </div>
            
                        <button type="submit" class="push-1-2">Submit</button>
                    </Form>
                </Formik>

            </div>   
        </div>
    )
}

export default InputComponent