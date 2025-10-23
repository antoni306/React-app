


interface Rate {
    currency: string;
    code: string;
    mid: number;
}


interface Calc {
    from: Rate,
    to: Rate,
    amount: number
}

interface TaskFormProps {
    onAdd: (task: Task) => void;
}
type Task = {
    date: Date,
    task: string
}

interface MyTable {
    rates: Rate[];
    effectiveDate: string;
}

interface Tables {
    tableA: MyTable | null;
    tableB: MyTable | null;
    tableC: MyTable | null;
}

type Props = {
    onPageChange: (page: string) => void;
};
export { Rate, Calc, TaskFormProps, Task, MyTable, Tables, Props }