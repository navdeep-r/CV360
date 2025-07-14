import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/users/usersSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const UsersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { users } = useAppSelector((state) => state.users)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View users')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View users')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/users/users-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>First Name</p>
                    <p>{users?.firstName}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Last Name</p>
                    <p>{users?.lastName}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Phone Number</p>
                    <p>{users?.phoneNumber}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>E-Mail</p>
                    <p>{users?.email}</p>
                </div>

                <FormField label='Disabled'>
                    <SwitchField
                      field={{name: 'disabled', value: users?.disabled}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>App Role</p>

                        <p>{users?.app_role?.name ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Complaints Citizen</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Title</th>

                                <th>Category</th>

                                <th>Latitude</th>

                                <th>Longitude</th>

                                <th>Severity</th>

                                <th>Status</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.complaints_citizen && Array.isArray(users.complaints_citizen) &&
                              users.complaints_citizen.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/complaints/complaints-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                    <td data-label="category">
                                        { item.category }
                                    </td>

                                    <td data-label="latitude">
                                        { item.latitude }
                                    </td>

                                    <td data-label="longitude">
                                        { item.longitude }
                                    </td>

                                    <td data-label="severity">
                                        { item.severity }
                                    </td>

                                    <td data-label="status">
                                        { item.status }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.complaints_citizen?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Complaints AssignedOfficial</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Title</th>

                                <th>Category</th>

                                <th>Latitude</th>

                                <th>Longitude</th>

                                <th>Severity</th>

                                <th>Status</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.complaints_assigned_official && Array.isArray(users.complaints_assigned_official) &&
                              users.complaints_assigned_official.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/complaints/complaints-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                    <td data-label="category">
                                        { item.category }
                                    </td>

                                    <td data-label="latitude">
                                        { item.latitude }
                                    </td>

                                    <td data-label="longitude">
                                        { item.longitude }
                                    </td>

                                    <td data-label="severity">
                                        { item.severity }
                                    </td>

                                    <td data-label="status">
                                        { item.status }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.complaints_assigned_official?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Dashboards Official</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Metrics</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.dashboards_official && Array.isArray(users.dashboards_official) &&
                              users.dashboards_official.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/dashboards/dashboards-view/?id=${item.id}`)}>

                                    <td data-label="metrics">
                                        { item.metrics }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.dashboards_official?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Dashboards Admin</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Metrics</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.dashboards_admin && Array.isArray(users.dashboards_admin) &&
                              users.dashboards_admin.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/dashboards/dashboards-view/?id=${item.id}`)}>

                                    <td data-label="metrics">
                                        { item.metrics }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.dashboards_admin?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Notifications User</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Message</th>

                                <th>SentAt</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.notifications_user && Array.isArray(users.notifications_user) &&
                              users.notifications_user.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/notifications/notifications-view/?id=${item.id}`)}>

                                    <td data-label="message">
                                        { item.message }
                                    </td>

                                    <td data-label="sent_at">
                                        { dataFormatter.dateTimeFormatter(item.sent_at) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.notifications_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Upvotes Citizen</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                            </tr>
                            </thead>
                            <tbody>
                            {users.upvotes_citizen && Array.isArray(users.upvotes_citizen) &&
                              users.upvotes_citizen.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/upvotes/upvotes-view/?id=${item.id}`)}>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.upvotes_citizen?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/users/users-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default UsersView;
