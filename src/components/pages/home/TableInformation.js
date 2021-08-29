import React, { useCallback, useMemo, useState } from "react";
/* import differenceBy from "lodash/differenceBy";
import Button from "../shared/Button"; */
import DataTable from "react-data-table-component";

/* const actions = <Button key="add">Add</Button>; */
const columns = [
	{
		name: "Fecha",
		selector: "date",
		sortable: true,
	},
	{
		name: "Vuelto",
		selector: "underC",
		sortable: true,
	},
	{
		name: "Grandes",
		selector: "overC",
		sortable: true,
		right: true,
	},
	{
		name: "Ualá",
		selector: "uala",
		sortable: true,
		right: true,
	},
	{
		name: "Binance",
		selector: "binance",
		sortable: true,
		right: true,
	},
	{
		name: "Mdex",
		selector: "mdex",
		sortable: true,
		right: true,
	},
];
const tableDataItems = [
	{ id: 1, date: "2021-02-26", underC: 0, overC: 10500, uala: 0, binance: 0, mdex: 0 },
	{ id: 2, date: "2021-03-27", underC: 450, overC: 4200, uala: 0, binance: 3500, mdex: 0 },
	{ id: 3, date: "2021-04-27", underC: 270, overC: 2500, uala: 690, binance: 5200, mdex: 0 },
	{ id: 4, date: "2021-05-27", underC: 180, overC: 3500, uala: 0, binance: 4467, mdex: 0 },
	{ id: 5, date: "2021-07-06", underC: 50, overC: 3500, uala: 0, binance: 3070, mdex: 0 },
	{ id: 6, date: "2021-07-27", underC: 50, overC: 4500, uala: 250, binance: 3276, mdex: 0 },
	{ id: 7, date: "2021-08-26", underC: 150, overC: 1600, uala: 346, binance: 5580, mdex: 5940 },
];

export default function RowToggle() {
	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [data, setData] = useState(tableDataItems);

	const handleRowSelected = useCallback((state) => {
		setSelectedRows(state.selectedRows);
	}, []);

	/* const contextActions = useMemo(() => {
		const handleDelete = () => {
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map((r) => r.name)}?`)) {
				setToggleCleared(!toggleCleared);
				setData(differenceBy(data, selectedRows, "name"));
			}
		};

		return {
			<Button key="delete" onClick={handleDelete} style={{ backgroundColor: "red" }} icon>
				Delete
			</Button>
		};
	}, [selectedRows, toggleCleared]); */

	return (
		<DataTable
			title="Balances"
			columns={columns}
			data={data}
			selectableRows
			/* actions={actions} */
			/* contextActions={contextActions} */
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
			pagination
		/>
	);
}
