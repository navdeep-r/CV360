import React from 'react';
import BaseIcon from '../BaseIcon';
import { mdiEye, mdiTrashCan, mdiPencilOutline } from '@mdi/js';
import axios from 'axios';
import {
    GridActionsCellItem,
    GridRowParams,
    GridValueGetterParams,
} from '@mui/x-data-grid';
import dataFormatter from '../../helpers/dataFormatter'
import DataGridMultiSelect from "../DataGridMultiSelect";
import ListActionsPopover from '../ListActionsPopover';
type Params = (id: string) => void;

export const loadColumns = async (
    onDelete: Params,
    entityName: string,
) => {
    async function callOptionsApi(entityName: string) {
        try {
        const data = await axios(`/${entityName}/autocomplete?limit=100`);
        return data.data;
        } catch (error) {
         console.log(error);
         return [];
        }
    }
    return [

        {
            field: 'official',
            headerName: 'Official',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,
            sortable: false,
            type: 'singleSelect',
            getOptionValue: (value: any) => value?.id,
            getOptionLabel: (value: any) => value?.label,
            valueOptions: await callOptionsApi('users'),
            valueGetter: (params: GridValueGetterParams) =>
                params?.value?.id ?? params?.value,

        },

        {
            field: 'admin',
            headerName: 'Admin',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,
            sortable: false,
            type: 'singleSelect',
            getOptionValue: (value: any) => value?.id,
            getOptionLabel: (value: any) => value?.label,
            valueOptions: await callOptionsApi('users'),
            valueGetter: (params: GridValueGetterParams) =>
                params?.value?.id ?? params?.value,

        },

        {
            field: 'metrics',
            headerName: 'Metrics',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,

        },

        {
            field: 'actions',
            type: 'actions',
            minWidth: 30,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
            getActions: (params: GridRowParams) => {

               return [
                   <div key={params?.row?.id}>
                      <ListActionsPopover
                      onDelete={onDelete}
                      itemId={params?.row?.id}
                      pathEdit={`/dashboards/dashboards-edit/?id=${params?.row?.id}`}
                      pathView={`/dashboards/dashboards-view/?id=${params?.row?.id}`}
                      hasUpdatePermission={true}
                    />
                   </div>,
                  ]
            },
        },
    ];
};
