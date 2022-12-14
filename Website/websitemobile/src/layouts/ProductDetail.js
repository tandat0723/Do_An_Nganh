import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Col, Form, Image, ListGroup, Row, Tab, Tabs } from 'react-bootstrap'
import { useParams } from 'react-router'
import Api, { endpoints } from '../configs/Api'
import '../static/Home.css'
import parse from 'html-react-parser'
import { UserContext } from './Boby'
import cookies from 'react-cookies'
import { MDBBtn, MDBSpinner } from 'mdb-react-ui-kit'
import Rating from 'react-rating'
import Moment from 'react-moment'
import $ from 'jquery'; 


const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState(null)
    const { product } = useParams()
    const [comment, setComment] = useState([])
    const [user] = useContext(UserContext)
    const [liked, setLiked] = useState(false)
    const [content, setContent] = useState()

    

    useEffect (() => {
        let loadProductDetail = async() => {
            try {
                let res =  await Api.get(endpoints['product-detail'](product))
                console.info(res.data)
                setProductDetail(res.data)
                setLiked(res.data.like)
            } 
            catch(err) {
                console.error(err)
            }
        }

        loadProductDetail()
    },[product])

    useEffect(() => {
        let loadComment = async() => {
            try {
                let res = await Api.get(endpoints['product-comments'](product),{
                    headers: {
                        'Authorization': `Bearer ${cookies.load('access_token')}`
                    }
                })
                setComment(res.data)
            }
            catch(err) {
                console.error(err)
            }
        }
        loadComment()
    },[product])


    const addComment = async (event) => {
        event.preventDefault()

        let res = await Api.post(endpoints['comments'],{
            headers: {
                'Authorization': `Bearer ${cookies.load('access_token')}`
            }
        },{
            'comment': comment, 
            'product': product,
            'creator': 1
        })
        console.info(res.data)
        setComment([...comment, res.data])
    }


    const like = async() => {
        let res = await Api.post(endpoints['like-product'](product),{
            headers: {
                'Authorization': `Bearer ${cookies.load('access_token')}`
            }
        })
        console.info(res)
        if (res.status ===200)
            setProductDetail(res.data.like)
    }


    const rate = async(rate) => {
        let res = await Api.post(endpoints['rate-product'](product),{
            headers: {
                'Authorization': `Bearer ${cookies.load('access_token')}`
            }
        },{
            'rate': rate
        })
        console.info(res.data)
        setProductDetail(res.data)
    }

    let likeStatus = 'outline-primary'
    if (liked === true)
        likeStatus = 'primary'

    
    if (productDetail === null)
        return  <div className='d-flex justify-content-center'>
                    <MDBSpinner role='status'>
                        <span className='visually-hidden'>Loading...</span> 
                    </MDBSpinner>
                </div>
    
    function popupSuccessShow() {
        $('.popup-success').fadeIn();
        $('.bgcover-success').fadeIn();
    }
    function popupSuccessHide() {
        $('.popup-success').fadeOut();
        $('.bgcover-success').fadeOut();
        $('.bg-coverrate').fadeOut();
    }

    function popupNotiShow() {
        $('.popup-errorForm').not('.popup-incomplete').fadeIn();
        $('.bgcover-errorForm').fadeIn();
    }
    function popupNotiHide() {
        $('.popup-errorForm').not('.popup-incomplete').fadeOut();
        $('.bgcover-errorForm').fadeOut();
    }

    return (
        <>
            <div className='detail'>
                <Row>
                    <Col md={5} xs={12}>
                        <Image src={productDetail.image} fluid />
                    </Col>
                    <Col md={7} xs={12}>
                        {productDetail.tags?.map(t => <i className='hash-tag' key={t.id}>{t.name}</i>)}
                        <br/><br/>

                        <h3 id={productDetail.id}>{productDetail.name}</h3>
                        <hr />

                        <div className='capacity'>
                            <span>Dung l?????ng: </span>
                            <ul className='active'>
                                {productDetail.memory?.map(m => <li key={m.id}>
                                    <a href='#'>{m.name}</a>
                                </li>)}
                            </ul>
                        </div>
                        <div className='text-info'>M??u: </div>
                        <strong className='price'>{productDetail.price}</strong>
                        <div>
                            <div className='text-info'> ????nh gi?? s???n ph???m: </div>
                            <MDBBtn variant={likeStatus} onClick={like}>Like</MDBBtn>
                            <br></br>
                            {user !== null && <Rating initialRating={productDetail.rate} onClick={rate} />}
                        </div>
                    </Col>
                </Row>
                <div className="wrap_rating wrap_border">
                    <div className="bg-coverrate"></div>
                    <div className="rating-topzone rc-topzone">
                    <div className="rating-topzonecr-uncmt">
                        <h2 className="rating-topzonecr-title">????nh gi?? s???n ph???m n??y</h2>
                        <ul className="rating-topzonecr-star">
                            <li data-val="1" className="click-openpopup">
                                <i className="iconcmt-unstarlist"></i>
                                <p data-val="1">R???t t???</p>
                            </li>
                            <li data-val="2" className="click-openpopup">
                                <i className="iconcmt-unstarlist"></i>
                                <p data-val="2">T???</p>
                            </li>
                            <li data-val="3" className="click-openpopup">
                                <i className="iconcmt-unstarlist"></i>
                                <p data-val="3">T???m ???n</p>
                            </li>
                            <li data-val="4" className="click-openpopup">
                                <i className="iconcmt-unstarlist"></i>
                                <p data-val="4">T???t</p>
                            </li>
                            <li data-val="5" className="click-openpopup">
                                <i className="iconcmt-unstarlist"></i>
                                <p data-val="5">R???t t???t</p>
                            </li>
                        </ul>
                    </div>

                    <div className="popup-rating-topzone" style={{display: "none"}}>
                        <div className="close-rate"></div>
                            <p className="txt">????nh gi?? s???n ph???m</p>
                            <div className="bproduct">
                                <div className="img">
                                    <Image src="https://cdn.tgdd.vn/Products/Images/42/289663/s16/iPhone-14-thumb-topzone (4)-650x650.png" alt="iPhone 14"/>
                                </div>
                                <h3>iPhone 14</h3>
                            </div>
                            <ul className="rating-topzonecr-star">
                                <li data-val="1">
                                    <i className="iconcmt-unstarlist active"></i>
                                    <p data-val="1">R???t t???</p>
                                </li>
                                <li data-val="2">
                                    <i className="iconcmt-unstarlist active"></i>
                                    <p data-val="2">T???</p>
                                </li>
                                <li data-val="3">
                                    <i className="iconcmt-unstarlist active"></i>
                                    <p data-val="3">T???m ???n</p>
                                </li>
                                <li data-val="4">
                                    <i className="iconcmt-unstarlist active"></i>
                                    <p data-val="4" className="active-slt">T???t</p>
                                </li>
                                <li data-val="5">
                                    <i className="iconcmt-unstarlist"></i>
                                    <p data-val="5">R???t t???t</p>
                                </li>
                            </ul>
                            <form action="" className="form-rate">
                                <a className="send-rate disabled">G???i ????nh gi??</a>

                                <p className="intro-txt">????? ????nh gi?? ???????c duy???t, vui l??ng tham kh???o <a href="#">Quy ?????nh duy???t ????nh gi??</a></p>
                            </form>
                        </div>
                        <div className="bgcover-errorForm"></div>

                        <div className="popup-errorForm">
                            <p className="content">C???m nh???n v??? s???n ph???m ch??a ???????c nh???p, b???n s???n l??ng chia s??? th??m ch????</p>
                            <div className="btn-errorForm">
                                <span className="unsend-rate" onClick={popupNotiHide()}>Kh??ng, g???i ????nh gi??</span>
                                <span className="ctnsend-rate ctnsend-continue">C??, vi???t c???m nh???n</span>
                            </div>
                        </div>

                        <div className="popup-errorForm popup-incomplete">
                            <p className="content">Ch??? ????! B???n ch??a g???i ????nh gi??, b???n c?? mu???n g???i ??i kh??ng?</p>
                            <div className="btn-errorForm">
                                <span className="unsend-rate" onClick={popupNotiHide()}>C??</span>
                                <span className="ctnsend-rate">Kh??ng</span>
                            </div>
                        </div>

                        <div className="bgcover-success"></div>
                        <div className="popup-success">
                            <h3 className="txt">G???i ????nh gi?? th??nh c??ng</h3>
                            <p className="content">C???m ??n b???n ???? ????nh gi?? s???n ph???m.<br/>H??? th???ng s??? ki???m duy???t v?? ????ng ????nh gi?? c???a b???n sau 1 - 2 ng??y.</p>
                            <div className="close-popup-success" onClick={popupSuccessHide()}>????ng</div>
                        </div>
                    </div>
                </div>

                <div className='body_de'>
                    <div className='body_detail'>
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="home" title="M?? t???">
                                {parse(`${productDetail.description}`)}
                            </Tab>    
                            <Tab className='' eventKey="tech" title="Th??ng s??? k?? thu???t">
                                {parse(`${productDetail.content}`)}
                            </Tab> 
                            <Tab eventKey="detail" title="Chi ti???t s???n ph???m">
                                {parse(`${productDetail.detail}`)}
                            </Tab> 
                        </Tabs>
                    </div>

                    <hr/>
                    <Row>
                        <Col>
                            <div dangerouslySetInnerHTML={{__html: productDetail.comment}}></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={addComment}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" value={content} onChange={(event) => setContent(event.target.value)} placeholder="Th??m b??nh lu???n..." />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Th??m b??nh lu???n
                                </Button>
                            </Form>
                        </Col>
                        <Col>
                            {/* {user != null && <CommentForm product={product} comment={comment} setComment={setComment} />} */}
                            {/* <ListGroup>
                                {comment.map(c => <li key={c.id}>{c.comment} - <Moment fromNow>{c.created_date}</Moment></li>)
                                }
                            </ListGroup> */}
                        </Col>
                    </Row>  
                </div>
            </div>  
        </>
    )
}

export default ProductDetail

