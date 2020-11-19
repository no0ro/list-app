class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.belongs_to :list
      t.timestamps
    end
  end
end
