import { Link, useLoaderData, useLocation } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from  '../../firebase'
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateProduct } from '../../redux/apiCall'


export default function Product() {
    const location = useLocation()
    const productId = location.pathname.split('/')[2]
    const product = useSelector(state => state.product.products.find(item => item._id === productId))

    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setInputs(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        if(file !== null) {
            const fileName = new Date().getTime() + file.name
            const storage = getStorage(app)
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //console.log('File available at', downloadURL);
            const product = {...inputs, img: downloadURL} 
            updateProduct(dispatch, productId, product)
          });
        }
      )
        }
    else {
        updateProduct(dispatch, productId, inputs)
    }
          
    }
console.log(file)
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img || "https://i.pinimg.com/736x/ac/7a/d3/ac7ad33adcb143c7d0d50988ce6aa529.jpg"} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">xxx</span>
                  </div>
                  {/* <div className="productInfoItem">
                      <span className="productInfoKey">active:</span>
                      <span className="productInfoValue">yes</span>
                  </div> */}
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" name='title' placeholder= {product.title}  onChange={handleChange}/>
                  <label>Description</label>
                  <input type="text" name="desc" placeholder= {product.desc}  onChange={handleChange}/>
                  <label>Price</label>
                  <input type="text" name='price' placeholder= {product.price}  onChange={handleChange}/>
                  <label>In Stock</label>
                  <select name="inStock" id="idStock" onChange={handleChange}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img || "https://i.pinimg.com/736x/ac/7a/d3/ac7ad33adcb143c7d0d50988ce6aa529.jpg" } alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" onChange={e => setFile(e.target.files[0])}  />
                  </div>
                  <button className="productButton" onClick={handleUpdate}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
