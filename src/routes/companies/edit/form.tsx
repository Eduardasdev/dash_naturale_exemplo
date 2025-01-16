import { Edit, useForm, useSelect } from "@refinedev/antd";
import type { HttpError } from "@refinedev/core";
import type {
  GetFields,
  GetFieldsFromList,
  GetVariables,
} from "@refinedev/nestjs-query";

import { Form, Input, InputNumber, Select } from "antd";

import { CustomAvatar, SelectOptionWithAvatar } from "@/components";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import type {
  BusinessType,
  CompanySize,
  Industry,
} from "@/graphql/schema.types";
import type {
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables,
  UsersSelectQuery,
} from "@/graphql/types";
import { getNameInitials } from "@/utilities";

import { UPDATE_COMPANY_MUTATION } from "./queries";

export const CompanyForm = () => {
  const {
    saveButtonProps,
    formProps,
    formLoading,
    query: queryResult,
  } = useForm<
    GetFields<UpdateCompanyMutation>,
    HttpError,
    GetVariables<UpdateCompanyMutationVariables>
  >({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });
  const { avatarUrl, name } = queryResult?.data?.data || {};

  const { selectProps: selectPropsUsers, query: queryResultUsers } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      breadcrumb={false}
    >
      <Form {...formProps} layout="vertical">
        <CustomAvatar
          shape="square"
          src={avatarUrl}
          name={getNameInitials(name || "")}
          style={{
            width: 96,
            height: 96,
            marginBottom: "24px",
          }}
        />
        <Form.Item
          label="Líder de Vendas"
          name="salesOwnerId"
          initialValue={formProps?.initialValues?.salesOwner?.id}
        >
          <Select
            {...selectPropsUsers}
            options={
              queryResultUsers.data?.data?.map(({ id, name, avatarUrl }) => ({
                value: id,
                label: (
                  <SelectOptionWithAvatar
                    name={name}
                    avatarUrl={avatarUrl ?? undefined}
                  />
                ),
              })) ?? []
            }
          />
        </Form.Item>
        <Form.Item label="Dimensão da Empresa" name="companySize">
          <Select options={companySizeOptions} />
        </Form.Item>
        <Form.Item label="Faturamento Total" name="totalRevenue">
          <InputNumber
            autoFocus
            addonBefore={"$"}
            min={0}
            placeholder="0,00"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <Form.Item label="Indústria" name="industry">
          <Select options={industryOptions} />
        </Form.Item>
        <Form.Item label="Categoria de Negócio" name="businessType">
          <Select options={businessTypeOptions} />
        </Form.Item>
        <Form.Item label="País" name="country">
          <Input placeholder="Country" />
        </Form.Item>
        <Form.Item label="Website" name="website">
          <Input placeholder="Website" />
        </Form.Item>
      </Form>
    </Edit>
  );
};

const companySizeOptions: {
  label: string;
  value: CompanySize;
}[] = [
  {
    label: "Multinacional",
    value: "ENTERPRISE",
  },
  {
    label: "Grande porte",
    value: "LARGE",
  },
  {
    label: "Médio porte",
    value: "MEDIUM",
  },
  {
    label: "Pequeno porte",
    value: "SMALL",
  },
];

const industryOptions: {
  label: string;
  value: Industry;
}[] = [
  { label: "Aeroespacial", value: "AEROSPACE" },
  { label: "Agricultura", value: "AGRICULTURE" },
  { label: "Automotivo", value: "AUTOMOTIVE" },
  { label: "Químicos", value: "CHEMICALS" },
  { label: "Construção", value: "CONSTRUCTION" },
  { label: "Defesa", value: "DEFENSE" },
  { label: "Educação", value: "EDUCATION" },
  { label: "Energia", value: "ENERGY" },
  { label: "Serviços Financeiros", value: "FINANCIAL_SERVICES" },
  { label: "Alimentos e Bebidas", value: "FOOD_AND_BEVERAGE" },
  { label: "Governo", value: "GOVERNMENT" },
  { label: "Saúde", value: "HEALTHCARE" },
  { label: "Hospitalidade", value: "HOSPITALITY" },
  { label: "Manufatura Industrial", value: "INDUSTRIAL_MANUFACTURING" },
  { label: "Seguros", value: "INSURANCE" },
  { label: "Ciências da Vida", value: "LIFE_SCIENCES" },
  { label: "Logística", value: "LOGISTICS" },
  { label: "Mídia", value: "MEDIA" },
  { label: "Mineração", value: "MINING" },
  { label: "Sem Fins Lucrativos", value: "NONPROFIT" },
  { label: "Outro", value: "OTHER" },
  { label: "Produtos Farmacêuticos", value: "PHARMACEUTICALS" },
  { label: "Serviços Profissionais", value: "PROFESSIONAL_SERVICES" },
  { label: "Imobiliário", value: "REAL_ESTATE" },
  { label: "Varejo", value: "RETAIL" },
  { label: "Tecnologia", value: "TECHNOLOGY" },
  { label: "Telecomunicações", value: "TELECOMMUNICATIONS" },
  { label: "Transporte", value: "TRANSPORTATION" },
  { label: "Utilidades", value: "UTILITIES" },
];

const businessTypeOptions: {
  label: string;
  value: BusinessType;
}[] = [
  {
    label: "B2B",
    value: "B2B",
  },
  {
    label: "B2C",
    value: "B2C",
  },
  {
    label: "B2G",
    value: "B2G",
  },
];
