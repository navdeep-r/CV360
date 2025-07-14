import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/complaints/complaintsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    title: '',

    description: '',

    category: 'sanitation',

    latitude: '',

    longitude: '',

    severity: 'Low',

    status: 'Pending',

    citizen: '',

    assigned_official: '',

}

const ComplaintsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/complaints/complaints-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                initialValues
            }
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

  <FormField label="Citizen" labelFor="citizen">
      <Field name="citizen" id="citizen" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>

  <FormField label="AssignedOfficial" labelFor="assigned_official">
      <Field name="assigned_official" id="assigned_official" component={SelectField} options={[]} itemRef={'users'}></Field>
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

ComplaintsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default ComplaintsNew
