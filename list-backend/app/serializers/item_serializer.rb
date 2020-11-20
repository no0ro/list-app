class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :lists, :id, :list_id, :updated_at, :created_at

  belongs_to :list, serializer: ListSerializer

end
