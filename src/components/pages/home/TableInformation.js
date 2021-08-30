import React, { useCallback, useEffect, useMemo, useState } from "react";
import differenceBy from "lodash/differenceBy";
// eslint-disable-next-line no-unused-vars
import { Button, Modal, ModalBody, ModalHeader, Input } from "reactstrap";
import DataTable from "react-data-table-component";

// Objects

const actions = <Button key="add">Añadir</Button>;
const columns = [
	{
		name: "Fecha",
		selector: "date",
		sortable: true,
		left: true,
	},
	{
		name: "Vuelto",
		selector: "underC",
		sortable: true,
		center: true,
	},
	{
		name: "Grandes",
		selector: "overC",
		sortable: true,
		center: true,
	},
	{
		name: "Ualá",
		selector: "uala",
		sortable: true,
		center: true,
	},
	{
		name: "Binance",
		selector: "binance",
		sortable: true,
		center: true,
	},
	{
		name: "Mdex",
		selector: "mdex",
		sortable: true,
		center: true,
	},
];

const tableDataItems = [
	{ id: 1, date: "2021-02-26", underC: 0, overC: 10500, uala: 0, binance: 0, mdex: 0 },
	{ id: 2, date: "2021-03-27", underC: 450, overC: 4200, uala: 0, binance: 3500, mdex: 0 },
	{ id: 3, date: "2021-04-27", underC: 270, overC: 2500, uala: 690, binance: 5200, mdex: 0 },
	{ id: 4, date: "2021-05-27", underC: 180, overC: 3500, uala: 0, binance: 4467, mdex: 0 },
	{ id: 5, date: "2021-07-06", underC: 50, overC: 3500, uala: 0, binance: 3070, mdex: 0 },
	{ id: 6, date: "2021-07-27", underC: 50, overC: 4500, uala: 250, binance: 3276, mdex: 0 },
	{ id: 7, date: "2021-08-26", underC: 150, overC: 1600, uala: 346, binance: 5638, mdex: 5973 },
];

export default function RowToggle({ usdValues, usdPrice }) {
	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [data, setData] = useState(tableDataItems);

	const handleRowSelected = useCallback((state) => {
		setSelectedRows(state.selectedRows);
	}, []);

	const contextActions = useMemo(() => {
		const handleDelete = () => {
			if (window.confirm(`Estás seguro que deseás eliminar: ${selectedRows.map((r) => r.date)}?`)) {
				setToggleCleared(!toggleCleared);
				setData(differenceBy(data, selectedRows, "date"));
			}
		};

		return (
			<Button key="delete" onClick={handleDelete} style={{ backgroundColor: "red" }}>
				Eliminar
			</Button>
		);
	}, [data, selectedRows, toggleCleared]);

	useEffect(() => {
		const roundUsdValue = (value) => {
			return (value / usdPrice).toFixed(2);
		};
		if (usdValues) {
			const tableDataItemsUsd = tableDataItems.map((item) => {
				const newItem = { ...item };
				newItem.underC = roundUsdValue(item.underC);
				newItem.overC = roundUsdValue(item.overC);
				newItem.uala = roundUsdValue(item.uala);
				newItem.binance = roundUsdValue(item.binance);
				newItem.mdex = roundUsdValue(item.mdex);
				return newItem;
			});
			setData(tableDataItemsUsd);
		} else {
			setData(tableDataItems);
		}
	}, [usdPrice, usdValues]);

	const paginationOptions = {
		rowsPerPageText: "Filas por página:",
		rangeSeparatorText: "de",
		selectAllRowsItem: true,
		selectAllRowsItemText: "Todos",
	};

	return (
		<div className="table-responsive">
			<DataTable
				title="Balances💰"
				columns={columns}
				data={data}
				selectableRows
				actions={actions}
				contextActions={contextActions}
				onSelectedRowsChange={handleRowSelected}
				clearSelectedRows={toggleCleared}
				pagination
				paginationComponentOptions={paginationOptions}
				fixedHeader
				fixedHeaderScrollHeight="600px"
			/>
		</div>
	);
}
