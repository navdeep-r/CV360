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

import { update, fetch } from '../../stores/complaints/complaintsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditComplaints = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'title': '',

    description: '',

    category: '',

    'latitude': '',

    'longitude': '',

    severity: '',

    status: '',

    citizen: null,

    assigned_official: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { complaints } = useAppSelector((state) => state.complaints)

  const { complaintsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: complaintsId }))
  }, [complaintsId])

  useEffect(() => {
    if (typeof complaints === 'object') {
      setInitialValues(complaints)
    }
  }, [complaints])

  useEffect(() => {
      if (typeof complaints === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (complaints)[el])

          setInitialValues(newInitialVal);
      }
  }, [complaints])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: complaintsId, data }))
    await router.push('/complaints/complaints-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit complaints')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit complaints'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="Title"
    >
        <Field
            name="title"
            placeholder="Title"
        />
    </FormField>

    <FormField label='Description' hasTextareaHeight>
        <Field
            name='description'
            id='description'
            component={RichTextField}
        ></Field>
    </FormField>

    <FormField label="Category" labelFor="category">
        <Field name="category" id="category" component="select">

            <option value="sanitation">sanitation</option>

            <option value="infrastructure">infrastructure</option>

            <option value="safety">safety</option>

        </Field>
    </FormField>

    <FormField
        label="Latitude"
    >
        <Field
            type="number"
            name="latitude"
            placeholder="Latitude"
        />
    </FormField>

    <FormField
        label="Longitude"
    >
        <Field
            type="number"
            name="longitude"
            placeholder="Longitude"
        />
    </FormField>

    <FormField label="Severity" labelFor="severity">
        <Field name="severity" id="severity" component="select">

            <option value="Low">Low</option>

            <option value="Medium">Medium</option>

            <option value="High">High</option>

            <option value="Critical">Critical</option>

        </Field>
    </FormField>

    <FormField label="Status" labelFor="status">
        <Field name="status" id="status" component="select">

            <option value="Pending">Pending</option>

            <option value="InProgress">InProgress</option>

            <option value="Resolved">Resolved</option>

        </Field>
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

    <FormField label='AssignedOfficial' labelFor='assigned_official'>
        <Field
            name='assigned_official'
            id='assigned_official'
            component={SelectField}
            options={initialValues.assigned_official}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/complaints/complaints-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditComplaints.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditComplaints
