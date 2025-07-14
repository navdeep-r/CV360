import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/upvotes/upvotesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditUpvotesPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    complaint: null,

    citizen: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { upvotes } = useAppSelector((state) => state.upvotes)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof upvotes === 'object') {
      setInitialValues(upvotes)
    }
  }, [upvotes])

  useEffect(() => {
      if (typeof upvotes === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (upvotes)[el])
          setInitialValues(newInitialVal);
      }
  }, [upvotes])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/upvotes/upvotes-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit upvotes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit upvotes'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label='Complaint' labelFor='complaint'>
        <Field
            name='complaint'
            id='complaint'
            component={SelectField}
            options={initialValues.complaint}
            itemRef={'complaints'}

            showField={'title'}

        ></Field>
    </FormField>

  <FormField label='Citizen' labelFor='citizen'>
        <Field
            name='citizen'
            id='citizen'
            component={SelectField}
            options={initialValues.citizen}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/upvotes/upvotes-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditUpvotesPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditUpvotesPage
