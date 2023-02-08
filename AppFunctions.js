import React from 'react'
import { errorToast } from './src/components/RNFunctions'


const AppFunctions = {
    errorToast: (text1, text2) => errorToast(text1, text2, 8000, true)
}
export default AppFunctions