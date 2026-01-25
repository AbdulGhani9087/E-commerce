import React ,{useState}from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image,setImage]=useState(false);
    

    const [productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"Women",
        old_price:"",
        new_price:"",
        
    });
    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        setImage(file);
    }
    const changehandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }
    const Add_Product=async()=>{
        console.log(productDetails);
        let responseData;
        let product=productDetails;

        let formData=new FormData();
        formData.append('product',image);
        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept: 'application/json'
            },
            body:formData
        }).then ((resp)=>resp.json()).then((data)=>{console.log(data); responseData=data;})
        if(responseData.success){
            product.image=responseData.image_url;
            console.log(product);
            await fetch ('http://localhost:4000/addproduct',{
                method :'POST',
                headers:{
                    Accept:'application/json',
                    'Content-type':'application/json'
                },
                body:JSON.stringify(product)
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product added successfully"):alert("Failed to add product");
                console.log(data);
            });
        }
    }


  return (
    <div className='add-product'>
        <div className="addproduct-itemfeild">
            <p>Product Title</p>
            <input value={productDetails.name} type="text" name ='name' placeholder='Type Here' onChange={changehandler} />
        </div>
        <div className="add_product-price">
            <div className="addproduct-itemfeild">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changehandler} type="text" name='old_price'placeholder='Type Here' />
            </div>
            <div className="addproduct-itemfeild">
                <p> Offer Price</p>
                <input value={productDetails.new_price} onChange={changehandler} type="text" name='new_price'placeholder='Type Here' />
            </div>
        </div>
        <div className="addproduct-itemfeild">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changehandler} name="category" className="add-product-selector">
                
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kids">Kids</option>
            </select>
        </div>
        <div className="addproduct-itemfeild">
            <label htmlFor="file-input">
                <img src={ image ?URL.createObjectURL(image):upload_area} className="addproduct-thumbnail-img" />
            </label>
            <input  onChange={handleImageChange} type="file" name='image' id='file-input' hidden/>
        </div>

        <button onClick={Add_Product} className='add-product-btn'>ADD</button>
    </div>
  )
}

export default AddProduct