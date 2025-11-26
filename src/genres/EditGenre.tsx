import { urlGenres } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import GenreForm from "./GenreForm";
import { genreCreationDTO } from "./genres.model";

export default function EditGenre() {
  return (
    <EditEntity<genreCreationDTO, genreCreationDTO>
      url={urlGenres}
      entityName="Genres"
      indexUrl="/genres"
    >
      {(entity, edit) => (
        <GenreForm
          model={entity}
          onSubmit={async (value) => {
            await edit(value);
          }}
        />
      )}
    </EditEntity>
  );
}
