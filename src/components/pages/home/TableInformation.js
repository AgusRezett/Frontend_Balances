import React, { useCallback, useEffect, useMemo, useState } from "react";
import differenceBy from "lodash/differenceBy";
// eslint-disable-next-line no-unused-vars
import { Button, Modal, ModalBody, ModalHeader, Input } from "reactstrap";
import DataTable from "react-data-table-component";

// Data
import MonthlyMoney from "../../../data/monthlyMoney.json";

const actions = <Button key="add">Añadir</Button>;

const tableDataItems = MonthlyMoney;

export default function RowToggle({ usdValues, usdPrice }) {
	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [data, setData] = useState(tableDataItems);
	const [columns, setColumns] = useState([]);

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
		//? Get an array of all the json whitespace names
		const jsonNames = ["fecha"].concat(
			Object.keys(tableDataItems[0].physical).concat(Object.keys(tableDataItems[0].invested))
		);

		//? Capitalize the first letter of each jsonNames item
		const jsonNamesCapitalized = jsonNames.map((name) => name.charAt(0).toUpperCase() + name.slice(1));

		//? Create an array of objects with the jsonNames and the jsonNamesCapitalized
		const physicalNames = Object.keys(tableDataItems[0].physical);
		const columns = jsonNames.map((name, index) => ({
			name: jsonNamesCapitalized[index],
			selector: name === "fecha" ? name : physicalNames.includes(name) ? `physical.${name}` : `invested.${name}`,
			sortable: true,
			center: true,
		}));
		setColumns(columns);

		const roundUsdValue = (value) => {
			return (value / usdPrice).toFixed(2);
		};
		if (usdValues) {
			const tableDataItemsUsd = tableDataItems.map((item) => {
				const newItem = { ...item };

				let tempPhysical = newItem.physical;
				Object.keys(tempPhysical).forEach((key) => {
					tempPhysical[key] = roundUsdValue(tempPhysical[key]);
				});
				let tempInvested = newItem.invested;
				Object.keys(tempInvested).forEach((key) => {
					tempInvested[key] = roundUsdValue(tempInvested[key]);
				});

				newItem.physical = tempPhysical;
				newItem.invested = tempInvested;
				return newItem;
			});
			console.log(tableDataItemsUsd);
			setData(tableDataItemsUsd);
		} else {
			//! It doesnt refresh the ARS values
			console.log(MonthlyMoney);
			setData(MonthlyMoney);
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
