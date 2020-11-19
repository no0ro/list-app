class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :lists

  belongs_to :list, serializer: ListSerializer

end
