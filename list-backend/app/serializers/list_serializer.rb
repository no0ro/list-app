class ListSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :items

  has_many :item, serializer: ItemSerializer
  
end
