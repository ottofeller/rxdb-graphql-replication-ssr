/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  money: any;
  timestamp: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};


/** expression to compare columns of type money. All fields are combined with logical 'AND'. */
export type Money_Comparison_Exp = {
  _eq?: Maybe<Scalars['money']>;
  _gt?: Maybe<Scalars['money']>;
  _gte?: Maybe<Scalars['money']>;
  _in?: Maybe<Array<Scalars['money']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['money']>;
  _lte?: Maybe<Scalars['money']>;
  _neq?: Maybe<Scalars['money']>;
  _nin?: Maybe<Array<Scalars['money']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** insert data into the table: "product" */
  insert_product?: Maybe<Product_Mutation_Response>;
  /** insert a single row into the table: "product" */
  insert_product_one?: Maybe<Product>;
  /** update data of the table: "product" */
  update_product?: Maybe<Product_Mutation_Response>;
  /** update single row of the table: "product" */
  update_product_by_pk?: Maybe<Product>;
};


/** mutation root */
export type Mutation_RootInsert_ProductArgs = {
  objects: Array<Product_Insert_Input>;
  on_conflict?: Maybe<Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_OneArgs = {
  object: Product_Insert_Input;
  on_conflict?: Maybe<Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ProductArgs = {
  _inc?: Maybe<Product_Inc_Input>;
  _set?: Maybe<Product_Set_Input>;
  where: Product_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_By_PkArgs = {
  _inc?: Maybe<Product_Inc_Input>;
  _set?: Maybe<Product_Set_Input>;
  pk_columns: Product_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "product" */
export type Product = {
  __typename?: 'product';
  createdAt: Scalars['timestamp'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  price: Scalars['money'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "product" */
export type Product_Aggregate = {
  __typename?: 'product_aggregate';
  aggregate?: Maybe<Product_Aggregate_Fields>;
  nodes: Array<Product>;
};

/** aggregate fields of "product" */
export type Product_Aggregate_Fields = {
  __typename?: 'product_aggregate_fields';
  avg?: Maybe<Product_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Product_Max_Fields>;
  min?: Maybe<Product_Min_Fields>;
  stddev?: Maybe<Product_Stddev_Fields>;
  stddev_pop?: Maybe<Product_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Product_Stddev_Samp_Fields>;
  sum?: Maybe<Product_Sum_Fields>;
  var_pop?: Maybe<Product_Var_Pop_Fields>;
  var_samp?: Maybe<Product_Var_Samp_Fields>;
  variance?: Maybe<Product_Variance_Fields>;
};


/** aggregate fields of "product" */
export type Product_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Product_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product" */
export type Product_Aggregate_Order_By = {
  avg?: Maybe<Product_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Product_Max_Order_By>;
  min?: Maybe<Product_Min_Order_By>;
  stddev?: Maybe<Product_Stddev_Order_By>;
  stddev_pop?: Maybe<Product_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Product_Stddev_Samp_Order_By>;
  sum?: Maybe<Product_Sum_Order_By>;
  var_pop?: Maybe<Product_Var_Pop_Order_By>;
  var_samp?: Maybe<Product_Var_Samp_Order_By>;
  variance?: Maybe<Product_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "product" */
export type Product_Arr_Rel_Insert_Input = {
  data: Array<Product_Insert_Input>;
  on_conflict?: Maybe<Product_On_Conflict>;
};

/** aggregate avg on columns */
export type Product_Avg_Fields = {
  __typename?: 'product_avg_fields';
  price?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "product" */
export type Product_Avg_Order_By = {
  price?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "product". All fields are combined with a logical 'AND'. */
export type Product_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Product_Bool_Exp>>>;
  _not?: Maybe<Product_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Product_Bool_Exp>>>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  price?: Maybe<Money_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "product" */
export enum Product_Constraint {
  /** unique or primary key constraint */
  ProductNameKey = 'Product_name_key',
  /** unique or primary key constraint */
  ProductPkey = 'Product_pkey'
}

/** input type for incrementing integer column in table "product" */
export type Product_Inc_Input = {
  price?: Maybe<Scalars['money']>;
};

/** input type for inserting data into table "product" */
export type Product_Insert_Input = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['money']>;
};

/** aggregate max on columns */
export type Product_Max_Fields = {
  __typename?: 'product_max_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['money']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "product" */
export type Product_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Min_Fields = {
  __typename?: 'product_min_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['money']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "product" */
export type Product_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** response of any mutation on the table "product" */
export type Product_Mutation_Response = {
  __typename?: 'product_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Product>;
};

/** input type for inserting object relation for remote table "product" */
export type Product_Obj_Rel_Insert_Input = {
  data: Product_Insert_Input;
  on_conflict?: Maybe<Product_On_Conflict>;
};

/** on conflict condition type for table "product" */
export type Product_On_Conflict = {
  constraint: Product_Constraint;
  update_columns: Array<Product_Update_Column>;
  where?: Maybe<Product_Bool_Exp>;
};

/** ordering options when selecting data from "product" */
export type Product_Order_By = {
  createdAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: "product" */
export type Product_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "product" */
export enum Product_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Price = 'price',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "product" */
export type Product_Set_Input = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['money']>;
};

/** aggregate stddev on columns */
export type Product_Stddev_Fields = {
  __typename?: 'product_stddev_fields';
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "product" */
export type Product_Stddev_Order_By = {
  price?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Product_Stddev_Pop_Fields = {
  __typename?: 'product_stddev_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "product" */
export type Product_Stddev_Pop_Order_By = {
  price?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Product_Stddev_Samp_Fields = {
  __typename?: 'product_stddev_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "product" */
export type Product_Stddev_Samp_Order_By = {
  price?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Product_Sum_Fields = {
  __typename?: 'product_sum_fields';
  price?: Maybe<Scalars['money']>;
};

/** order by sum() on columns of table "product" */
export type Product_Sum_Order_By = {
  price?: Maybe<Order_By>;
};

/** update columns of table "product" */
export enum Product_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Name = 'name',
  /** column name */
  Price = 'price'
}

/** aggregate var_pop on columns */
export type Product_Var_Pop_Fields = {
  __typename?: 'product_var_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "product" */
export type Product_Var_Pop_Order_By = {
  price?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Product_Var_Samp_Fields = {
  __typename?: 'product_var_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "product" */
export type Product_Var_Samp_Order_By = {
  price?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Product_Variance_Fields = {
  __typename?: 'product_variance_fields';
  price?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "product" */
export type Product_Variance_Order_By = {
  price?: Maybe<Order_By>;
};

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "product" */
  product: Array<Product>;
  /** fetch aggregated fields from the table: "product" */
  product_aggregate: Product_Aggregate;
  /** fetch data from the table: "product" using primary key columns */
  product_by_pk?: Maybe<Product>;
};


/** query root */
export type Query_RootProductArgs = {
  distinct_on?: Maybe<Array<Product_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Order_By>>;
  where?: Maybe<Product_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Order_By>>;
  where?: Maybe<Product_Bool_Exp>;
};


/** query root */
export type Query_RootProduct_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "product" */
  product: Array<Product>;
  /** fetch aggregated fields from the table: "product" */
  product_aggregate: Product_Aggregate;
  /** fetch data from the table: "product" using primary key columns */
  product_by_pk?: Maybe<Product>;
};


/** subscription root */
export type Subscription_RootProductArgs = {
  distinct_on?: Maybe<Array<Product_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Order_By>>;
  where?: Maybe<Product_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_AggregateArgs = {
  distinct_on?: Maybe<Array<Product_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Product_Order_By>>;
  where?: Maybe<Product_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProduct_By_PkArgs = {
  id: Scalars['uuid'];
};


/** expression to compare columns of type timestamp. All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamp']>;
  _gt?: Maybe<Scalars['timestamp']>;
  _gte?: Maybe<Scalars['timestamp']>;
  _in?: Maybe<Array<Scalars['timestamp']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamp']>;
  _lte?: Maybe<Scalars['timestamp']>;
  _neq?: Maybe<Scalars['timestamp']>;
  _nin?: Maybe<Array<Scalars['timestamp']>>;
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};
