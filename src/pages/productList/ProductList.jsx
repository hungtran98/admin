import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, deleteProduct } from '../../redux/apiCall'

export default function ProductList() {
  const [data, setData] = useState(productRows);
  const products = useSelector(state => state.product.products)

  //console.log("lst product:",products)
  
  const dispatch = useDispatch()

  useEffect( () => {
    getProducts(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteProduct(dispatch, id)
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 220},
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 120 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        getRowId = { row => row._id}
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
