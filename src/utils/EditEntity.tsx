import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DisplayError from "./DisplayError";
import Loading from "./Loading";

export default function EditEntity<TRead, TCreation>
    (props: editEntityProps<TRead, TCreation>) {
    const { id }: any = useParams();
    const [entity, setEntity] = useState<TCreation>()
    const [errors, setErrors] = useState<string[]>([])
    const history = useHistory();

    useEffect(function () {
        axios.get(`${props.url}/${id}`).
            then((response: AxiosResponse<TRead>) => {
                setEntity(props.transform(response.data))
            }).catch((exception) => {
                alert(exception)
            });
    }, [id])

    async function edit(entityToEdit: TCreation) {
        try {
            await axios.put(`${props.url}/${id}`, entityToEdit);
            history.push(props.indexUrl);
        }
        catch (axiosError) {
            const error = axiosError as AxiosError;
            console.error(error);
            if (error && error.response) {
                setErrors(error.response.data as string[]);
            }
        }
    }


    return (
        <>
            <h3> Edit {props.entityName}</h3>
            <DisplayError errors={errors} />
            {
                entity ? props.children(entity, edit)
                    : <Loading></Loading>
            }
        </>
    );
}

interface editEntityProps<TRead, TCreation> {
    url: string;
    transform(entity: TRead): TCreation;
    entityName: string;
    children(entity: TCreation, edit: (entity: TCreation) => void): React.ReactElement;
    indexUrl: string;
}

EditEntity.defaultProps = {
    transform: (entity: any) => entity
}