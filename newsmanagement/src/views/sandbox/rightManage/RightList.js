import React, { useEffect, useState } from 'react'
import {Table,Tag,Button,Modal} from 'antd'
import axios from 'axios';
import {DeleteOutlined, EditOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import { Popover } from 'antd';
import { Switch } from 'antd';


const {confirm}=Modal


const eliminateChildren=(list)=>{
    return list.map(item=>{
      if (item.children.length===0){
        item.children=''
      }
      return item
    })
} 



export default function RightList() {
  const [dataSource,setdataSource] =useState([])
  
  useEffect(()=>{
     axios.get("http://127.0.0.1:5000/rights?_embed=children").then(res=>{
      const result=eliminateChildren(res.data)
      setdataSource(result)
      console.log(result)
     })
  },[])
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render(id) {
        return <b>{id}</b>
      },
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render(key) {
        return <Tag color="orange">{key}</Tag>
      },
      
    },
    {
      title:'操作',
      render(item) {
        return <div>
          <Button onClick ={()=>{notifyConfirm(item)}} danger type='primary' shape='circle' icon={<DeleteOutlined/>}></Button>
          <Popover content={<div>
            <Switch checked={item.pagepermisson} onChange={()=>switchMethod(item)}></Switch>
          </div>} title="页面配置项" trigger={item.pagepermisson!==undefined?"click":""} >
            <Button type='primary' shape='circle' icon ={<EditOutlined/>} disabled={item.pagepermisson===undefined}></Button>
          </Popover>
        </div>
      },
      
    },
  ];
  
  const switchMethod = (item)=>{
    item.pagepermisson = item.pagepermisson===1?0:1
    setdataSource([...dataSource])

    if(item.grade===1){
      axios.patch(`http://127.0.0.1:5000/rights/${item.id}`,{
        pagepermisson:item.pagepermisson
      })

      
    }else{
      axios.patch(`http://127.0.0.1:5000/children/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }
  }

  const notifyConfirm = (item)=>{
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Please make sure！！！！！',
      onOk() {
        deleteItem(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  const deleteItem = (item)=>{
    if(item.grade===1){
      axios.delete(`http://127.0.0.1:5000/rights/${item.id}`)
      setdataSource(dataSource.filter(data =>data.id !==item.id))
      
    }else{
      const list =dataSource.filter(data =>data.id===item.rightId)
      list[0].children = list[0].children.filter(data => data.id!== item.id)
      setdataSource([...dataSource])
      axios.delete(`http://127.0.0.1:5000/children/${item.id}`)
    }
}
 
  
  return (


    <div>
        <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}}/>
    </div>
  )
}
