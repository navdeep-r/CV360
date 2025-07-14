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

import { update, fetch } from '../../stores/dashboards/dashboardsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditDashboards = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    official: null,

    admin: null,

    'metrics': '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { dashboards } = useAppSelector((state) => state.dashboards)

  const { dashboardsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: dashboardsId }))
  }, [dashboardsId])

  useEffect(() => {
    if (typeof dashboards === 'object') {
      setInitialValues(dashboards)
    }
  }, [dashboards])

  useEffect(() => {
      if (typeof dashboards === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (dashboards)[el])

          setInitialValues(newInitialVal);
      }
  }, [dashboards])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: dashboardsId, data }))
    await router.push('/dashboards/dashboards-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit dashboards')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit dashboards'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField label='Official' labelFor='official'>
        <Field
            name='official'
            id='official'
            component={SelectField}
            options={initialValues.official}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

    <FormField label='Admin' labelFor='admin'>
        <Field
            name='admin'
            id='admin'
            component={SelectField}
            options={initialValues.admin}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

    <FormField
        label="Metrics"
    >
        <Field
            name="metrics"
            placeholder="Metrics"
        />
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/dashboards/dashboards-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditDashboards.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditDashboards
