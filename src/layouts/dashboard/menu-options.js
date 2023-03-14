import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const options = [
  {
    title: 'Listar',
    icon: <ListAltIcon />,
    path: '/students'
  },
  {
    title: 'Criar',
    icon: <AddIcon />,
    path: '/students/create'
  },
  {
    title: 'Editar',
    icon: <EditIcon />,
    path: '/students/edit'
  }
];