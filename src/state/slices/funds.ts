import { createSlice } from '@reduxjs/toolkit'

import pic01 from '../../assets/candidates/01-460x740.jpeg'
import pic02 from '../../assets/candidates/02-460x740.jpeg'
import pic03 from '../../assets/candidates/03-460x740.jpeg'
import pic04 from '../../assets/candidates/04-460x740.jpeg'
import pic05 from '../../assets/candidates/05-460x740.jpeg'
import pic06 from '../../assets/candidates/06-460x740.jpeg'
import pic07 from '../../assets/candidates/07-460x740.jpeg'
import pic08 from '../../assets/candidates/08-460x740.jpeg'
import pic09 from '../../assets/candidates/09-460x740.jpeg'
import pic10 from '../../assets/candidates/10-460x740.jpeg'
import pic11 from '../../assets/candidates/11-460x740.jpeg'
import pic12 from '../../assets/candidates/12-460x740.jpeg'
import pic13 from '../../assets/candidates/13-460x740.jpeg'
import pic14 from '../../assets/candidates/14-460x740.jpeg'
import pic15 from '../../assets/candidates/15-460x740.jpeg'
import pic16 from '../../assets/candidates/16-460x740.jpeg'
import pic17 from '../../assets/candidates/17-460x740.jpeg'
import pic18 from '../../assets/candidates/18-460x740.jpeg'
import pic19 from '../../assets/candidates/19-460x740.jpeg'
import pic20 from '../../assets/candidates/20-460x740.jpeg'
import pic21 from '../../assets/candidates/21-460x740.jpeg'
import pic22 from '../../assets/candidates/22-460x740.jpeg'
import pic23 from '../../assets/candidates/23-460x740.jpeg'
import pic24 from '../../assets/candidates/24-460x740.jpeg'
import pic25 from '../../assets/candidates/25-460x740.jpeg'
import pic26 from '../../assets/candidates/26-460x740.jpeg'
import pic27 from '../../assets/candidates/27-460x740.jpeg'
import pic28 from '../../assets/candidates/28-460x740.jpeg'
import pic29 from '../../assets/candidates/29-460x740.jpeg'
import pic30 from '../../assets/candidates/30-460x740.jpeg'
import pic31 from '../../assets/candidates/31-460x740.jpeg'
import {
  loadTopFunds,
  createFund,
  deleteFund,
  exitFund,
  investFund,
  placeOrder,
} from '../api-actions'
import { Candidate, Fund } from '../types'

type TopFundsState = { topFunds: Fund[] }
const initialState: TopFundsState = { topFunds: [] }

export const candidates: Candidate[] = [
  {
    number: 1,
    name: 'นายวิโรจน์ ลักขณาอดิศร',
    image: pic01 as string,
    thumbnail: pic01 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 2,
    name: 'พ.ท.หญิง ฐิฏา รังสิตพล มานิตกุล',
    image: pic02 as string,
    thumbnail: pic02 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 3,
    name: 'นายสกลธี ภัททิยกุล',
    image: pic03 as string,
    thumbnail: pic03 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 4,
    name: 'นายสุชัชวีร์ สุวรรณสวัสดิ์',
    image: pic04 as string,
    thumbnail: pic04 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 5,
    name: 'นายวีรชัย เหล่าเรืองวัฒนะ',
    image: pic05 as string,
    thumbnail: pic05 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 6,
    name: 'พล.ต.อ. อัศวิน ขวัญเมือง',
    image: pic06 as string,
    thumbnail: pic06 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 7,
    name: 'นางสาวรสนา โตสิตระกูล',
    image: pic07 as string,
    thumbnail: pic07 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 8,
    name: 'นายชัชชาติ สิทธิพันธุ์',
    image: pic08 as string,
    thumbnail: pic08 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 9,
    name: 'นางสาววัชรี วรรณศรี',
    image: pic09 as string,
    thumbnail: pic09 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 10,
    name: 'นายศุภชัย ตันติคมน์',
    image: pic10 as string,
    thumbnail: pic10 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 11,
    name: 'น.ต. ศิธา ทิวารี',
    image: pic11 as string,
    thumbnail: pic11 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 12,
    name: 'นายประยูร ครองยศ',
    image: pic12 as string,
    thumbnail: pic12 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 13,
    name: 'นายพิศาล กิตติเยาวมาลย์',
    image: pic13 as string,
    thumbnail: pic13 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 14,
    name: 'นายธเนตร วงษา',
    image: pic14 as string,
    thumbnail: pic14 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 15,
    name: 'พล.อ.ต. ทูตปรีชา เลิศสันทัดวาที',
    image: pic15 as string,
    thumbnail: pic15 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 16,
    name: 'นางสาวศศิกานต์ วัฒนะจันทร์',
    image: pic16 as string,
    thumbnail: pic16 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 17,
    name: 'นายอุเทน ชาติภิญโญ',
    image: pic17 as string,
    thumbnail: pic17 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 18,
    name: 'นางสาวสุมนา พันธุ์ไพโรจน์',
    image: pic18 as string,
    thumbnail: pic18 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 19,
    name: 'นายไกรเดช บุนนาค',
    image: pic19 as string,
    thumbnail: pic19 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 20,
    name: 'นางอมรพรรณ อุ่นสุวรรณ',
    image: pic20 as string,
    thumbnail: pic20 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 21,
    name: 'นายนิพัทธ์พนธ์ สุวรรณชนะ',
    image: pic21 as string,
    thumbnail: pic21 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 22,
    name: 'นายวรัญชัย โชคชนะ',
    image: pic22 as string,
    thumbnail: pic22 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 23,
    name: 'นายเฉลิมพล อุตรัตน์',
    image: pic23 as string,
    thumbnail: pic23 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 24,
    name: 'นายโฆสิต สุวินิจจิต',
    image: pic24 as string,
    thumbnail: pic24 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 25,
    name: 'นายประพัฒน์ บรรจงศิริเจริญ',
    image: pic25 as string,
    thumbnail: pic25 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 26,
    name: 'พล.ต.ท. มณฑล เงินวัฒนะ',
    image: pic26 as string,
    thumbnail: pic26 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 27,
    name: 'นายภูมิพัฒน์ อัศวภูภินทร์',
    image: pic27 as string,
    thumbnail: pic27 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 28,
    name: 'นายสราวุธ เบญจกุล',
    image: pic28 as string,
    thumbnail: pic28 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 29,
    name: 'นายกฤตชัย พยอมแย้ม',
    image: pic29 as string,
    thumbnail: pic29 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 30,
    name: 'นายพงศา ชูแนม',
    image: pic30 as string,
    thumbnail: pic30 as string,
    votes: 0,
    enable: true,
  },
  {
    number: 31,
    name: 'นายวิทยา จังกอบพัฒนา',
    image: pic31 as string,
    thumbnail: pic31 as string,
    votes: 0,
    enable: true,
  }
]

const slice = createSlice({
  name: 'funds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTopFunds.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.topFunds = action.payload.data
      }
    })
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.topFunds = action.payload.data.funds
      }
    })
    builder.addCase(investFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.topFunds = action.payload.data.funds
      }
    })
    builder.addCase(exitFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.topFunds = action.payload.data.funds
      }
    })
    builder.addCase(createFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.topFunds = action.payload.data.funds
      }
    })
    builder.addCase(deleteFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.topFunds = action.payload.data.funds
      }
    })
  },
})

export const { reducer: fundsReducer } = slice
