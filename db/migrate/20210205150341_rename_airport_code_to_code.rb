class RenameAirportCodeToCode < ActiveRecord::Migration[6.0]
  def change
    rename_column :airports, :airport_code, :code
  end
end
